# CS180 (CS280A): Project 1 starter Python code

# these are just some suggested libraries
# instead of scikit-image you could use matplotlib and opencv to read, write, and display images

import numpy as np
import skimage as sk
import skimage.io as skio

# define the metrics
def crop_border (image, crop_pct=0.1):
    h, w = image.shape
    dh, dw = int(h * crop_pct), int(w * crop_pct)
    return image[dh:h-dh, dw:w-dw]

def l2_score(image1, image2):
    return -np.sqrt(np.sum(np.sum((image1-image2)**2)))

def ncc_score(image1, image2):
    image1 = crop_border(image1)
    image2 = crop_border(image2)
    v1 = (image1 - np.mean(image1)).flatten() 
    v2 = (image2 - np.mean(image2)).flatten()
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# define the aligning algorithms
def align_single_scale(image, ref, window=30, get_score=ncc_score):
    """Exhaustive search"""
    best_score = -float('inf')
    best_shift = (0, 0)
    best_img = image
    for dy in range(-window, window + 1):
        for dx in range(-window, window + 1):
            shifted = np.roll(np.roll(image, dy, axis=0), dx, axis=1)
            score = get_score(shifted, ref)
            if score > best_score:
                best_score = score
                best_shift = (dx, dy)
                best_img = shifted
    return best_img, best_shift

def align_pyramid(image, ref, max_levels=4, window=30, get_score=ncc_score):
    if image.shape[0] < 400 or max_levels <= 1:
        return align_single_scale(image, ref, window, get_score)

    small_img = sk.transform.rescale(image, 0.5, anti_aliasing=True)
    small_ref = sk.transform.rescale(ref, 0.5, anti_aliasing=True)
    _, (dx, dy) = align_pyramid(small_img, small_ref, max_levels - 1, window, get_score=get_score) # best displacement of smaller image

    dx, dy = dx * 2, dy * 2
    coarse_shifted = np.roll(np.roll(image, dy, axis=0), dx, axis=1)
    shifted, (ddx, ddy) = align_single_scale(coarse_shifted, ref, window=2, get_score=get_score)

    return shifted, (dx + ddx, dy + ddy)

# name of the input file
photo = 'trees.jpg'
# imname = f'CS180_fa2026_proj1_data/{photo}'
imname = f'custom_images/{photo}'

# read in the image
im = skio.imread(imname)

# convert to double (might want to do this later on to save memory)    
im = sk.img_as_float(im)
    
# compute the height of each part (just 1/3 of total)
height = np.floor(im.shape[0] / 3.0).astype(int)

# separate color channels
b = im[:height]
g = im[height: 2*height]
r = im[2*height: 3*height]

# align the images
# functions that might be useful for aligning the images include:
# np.roll, np.sum, sk.transform.rescale (for multiscale)

ag, ag_shift = align_pyramid(g, b, get_score=ncc_score)
ar, ar_shift = align_pyramid(r, b, get_score=ncc_score)

# ag, ag_shift = align_single_scale(g, b, get_score=ncc_score)
# ar, ar_shift = align_single_scale(r, b, get_score=ncc_score)

### ag = align(g, b)
### ar = align(r, b)
# create a color image
im_out = np.dstack([ar, ag, b])

# save the image

fname = f'custom_images_aligned/{photo}'
# fname = f'single_scale_aligned_imgs/{photo}'
skio.imsave(fname, sk.img_as_ubyte(im_out))

# display the image
skio.imshow(im_out)
skio.show()