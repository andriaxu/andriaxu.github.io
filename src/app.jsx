import React, { useState, useEffect } from 'react';
import { BookOpen, User, GraduationCap, Github, Twitter, Mail, ChevronRight, ArrowLeft } from 'lucide-react';

const siteContent = {
  about: {
    title: 'About Me',
    body: 'Hi! I'm Andria, a current undergrad at UC Berkeley.',
  },
  writing: {
    title: 'Blog & Essays',
    body: 'These are my thoughts!',
    posts: [
      {
        id: 1,
        date: 'January 24, 2024',
        title: 'The Silence Between Notes: A Study in Minimalist Composition',
        excerpt: 'How the absence of information creates more resonance than its abundance. Exploring the negative space in modern digital interfaces...',
        content: `
          <p class="mb-8 text-xl leading-relaxed">The concept of negative space is often discussed in visual arts, but its application in digital interface design is where the most profound psychological impact occurs. When we strip away the non-essential, what remains begins to speak with greater clarity.</p>
          <p class="mb-8 text-xl leading-relaxed">In musical composition, the rests are as vital as the notes themselves. They provide the breath, the anticipation, and the rhythm. Similarly, in a world of infinite scrolls and notification pings, the 'silent' interface provides a sanctuary for the user's attention.</p>
          <p class="mb-8 text-xl leading-relaxed">Minimalism is not the lack of something. It is simply the perfect amount of something. By focusing on the essential, we respect the user's cognitive load and create an experience that feels like a dialogue rather than a broadcast.</p>
        `,
        category: 'Philosophy'
      },
      {
        id: 2,
        date: 'December 12, 2023',
        title: 'Architecture of Thought: How We Build Mental Models',
        excerpt: 'Understanding the cognitive scaffolding we use to process complex information and how to design for better mental clarity...',
        content: `
          <p class="mb-8 text-xl leading-relaxed">Every user arrives at a new platform with a pre-existing mental model—a set of assumptions about how things work based on their past experiences.</p>
          <p class="mb-8 text-xl leading-relaxed">When design fails, it's often because the visual hierarchy contradicts the user's logical hierarchy. By mapping out the 'scaffolding' of our thoughts, we can build interfaces that feel intuitive because they mirror the internal structures of our own minds.</p>
        `,
        category: 'Design'
      }
    ]
  },
  teaching: {
    title: 'Teaching',
    body: 'Here are some of the course notes for the classes I taught.',
    items: [
      'Introduction to Deep Learning (Spring 2026)',
      'Computational Structures in Data Science (Fall 2024)',
    ]
  }
};

/**
 * APPLICATION LOGIC
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setSelectedPost(null);
  }, [activeTab]);

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'writing', label: 'Writing' },
    { id: 'teaching', label: 'Teaching' },
  ];

  // Full Page Reading Mode
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] font-serif selection:bg-[#F3E9D2] animate-in fade-in duration-700">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <button 
            onClick={() => setSelectedPost(null)}
            className="fixed top-12 left-6 md:left-12 lg:left-24 flex items-center gap-2 text-stone-400 hover:text-amber-900 transition-colors font-sans text-xs uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <header className="mb-16 text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-amber-700">{selectedPost.category}</span>
              <span className="w-1 h-1 bg-stone-200 rounded-full" />
              <span className="text-xs uppercase tracking-[0.3em] font-sans text-stone-400">{selectedPost.date}</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-stone-900 mb-8 italic font-light leading-tight tracking-tight">{selectedPost.title}</h1>
            <div className="w-12 h-px bg-stone-200 mx-auto"></div>
          </header>

          <article 
            className="prose prose-stone prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          <footer className="mt-32 pt-12 border-t border-stone-100 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-stone-300 mb-8">End of Journal</p>
            <button 
              onClick={() => setSelectedPost(null)}
              className="px-8 py-3 border border-stone-200 rounded-full text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300"
            >
              Return to Portfolio
            </button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] font-serif selection:bg-[#F3E9D2]">
      <main className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          
          {/* Left Column: Identity */}
          <div className="w-full md:w-[40%] flex flex-col items-center text-center sticky top-20">
            <div className="relative group mb-8">
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full border border-stone-200 overflow-hidden bg-stone-100 flex items-center justify-center transition-all duration-700 ease-out group-hover:border-stone-400 group-hover:scale-[1.02] shadow-sm">
                <img 
                  src="" # ADD IMAGE HERE
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-stone-900">Alexander Thorne</h1>
            <p className="text-stone-500 font-sans uppercase tracking-[0.2em] text-xs mb-8">Writer & Educator</p>
            <div className="flex gap-6 text-stone-400">
              <a href="https://www.linkedin.com/in/andriaxu/" className="hover:text-amber-800 transition-colors duration-300"><LinkedIn size={18} strokeWidth={1.5} /></a>
              <a href="#" className="hover:text-amber-800 transition-colors duration-300"><Github size={18} strokeWidth={1.5} /></a>
              <a href="mailto:{andria.xu@berkeley.edu}?subject={I saw your website!}" className="hover:text-amber-800 transition-colors duration-300"><Mail size={18} strokeWidth={1.5} /></a>
            </div>
          </div>

          {/* Right Column: Interactive Tabs & Content */}
          <div className="flex-1 w-full md:pl-8 border-l border-stone-50">
            <nav className="flex gap-10 border-b border-stone-100 mb-12 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 font-sans ${
                    activeTab === tab.id ? 'text-amber-900 font-semibold' : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {tab.label}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-amber-800 transition-all duration-500 ease-in-out ${activeTab === tab.id ? 'w-full' : 'w-0'}`} />
                </button>
              ))}
            </nav>

            <div className="min-h-[400px]">
              <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h2 className="text-3xl mb-8 text-stone-800 italic font-light">{siteContent[activeTab].title}</h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-2xl font-light">{siteContent[activeTab].body}</p>
                
                {activeTab === 'writing' && (
                  <div className="space-y-12">
                    {siteContent.writing.posts.map((post) => (
                      <article key={post.id} className="group cursor-pointer" onClick={() => setSelectedPost(post)}>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-[10px] uppercase tracking-widest font-sans text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{post.category}</span>
                          <span className="text-[10px] uppercase tracking-widest font-sans text-stone-400">{post.date}</span>
                        </div>
                        <h3 className="text-xl text-stone-800 mb-3 group-hover:text-amber-900 transition-colors duration-300 flex items-center gap-2">
                          {post.title}
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 text-amber-700" />
                        </h3>
                        <p className="text-stone-500 text-sm leading-relaxed max-w-xl line-clamp-2">{post.excerpt}</p>
                      </article>
                    ))}
                  </div>
                )}

                {activeTab === 'teaching' && (
                  <ul className="space-y-6">
                    {siteContent.teaching.items.map((item, idx) => (
                      <li key={idx} className="group flex items-start gap-5">
                        <span className="mt-3 w-1 h-1 rounded-full bg-amber-300 group-hover:bg-amber-600 transition-all duration-500 shrink-0" />
                        <span className="text-stone-700 group-hover:text-stone-950 transition-colors duration-300 border-b border-transparent group-hover:border-stone-100 pb-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed -bottom-10 -left-10 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[30rem] font-serif leading-none italic">T</span>
      </div>
    </div>
  );
}
