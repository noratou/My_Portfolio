import { 
  Mail, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Code2, 
  Globe, 
  ChevronRight,
  ExternalLink,
  Lock,
  Layout
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0715] text-gray-200 font-sans selection:bg-purple-500/30">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-900/20 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-purple-500/10 bg-[#0f0715]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            NORA.PAN
          </span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://github.com/noratou" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider hover:text-purple-400 hover:border-purple-500/50 transition-all">
              GITHUB
            </a>
            <a href="https://linkedin.com/in/nora-pan" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider hover:text-purple-400 hover:border-purple-500/50 transition-all">
              LINKEDIN
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center md:text-left md:flex items-center">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-bold mb-6 tracking-widest">
            AVAILABLE NOV 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Nora <span className="text-purple-500 italic">Pan</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            Backend & Software Engineer specializing in <span className="text-white font-semibold">Risk Control</span> & <span className="text-white font-semibold">Infrastructure</span>.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="mailto:p.nora25n@gmail.com" className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20">
              <Mail size={18} /> Contact Me
            </a>
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-end">
           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative px-12 py-12 bg-[#1a1025] rounded-2xl border border-white/5 flex items-center justify-center">
                <ShieldCheck size={120} className="text-purple-500" />
              </div>
           </div>
        </div>
      </header>

      {/* Stats/Highlight */}
      <section id="about" className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="bg-[#1a1025]/50 border border-purple-500/10 p-6 rounded-2xl text-center md:text-left">
          <Database className="text-purple-500 mb-4 mx-auto md:mx-0" />
          <h3 className="text-white font-bold mb-1">Double Major</h3>
          <p className="text-sm text-gray-500">Digital Systems Security & AI and Big Data</p>
        </div>
        <div className="bg-[#1a1025]/50 border border-purple-500/10 p-6 rounded-2xl text-center md:text-left">
          <Globe className="text-purple-500 mb-4 mx-auto md:mx-0" />
          <h3 className="text-white font-bold mb-1">Languages</h3>
          <p className="text-sm text-gray-500">Mandarin (Native), English, German (B1), Korean, Japanese</p>
        </div>
        <div className="bg-[#1a1025]/50 border border-purple-500/10 p-6 rounded-2xl text-center md:text-left">
          <Code2 className="text-purple-500 mb-4 mx-auto md:mx-0" />
          <h3 className="text-white font-bold mb-1">Engineering Focus</h3>
          <p className="text-sm text-gray-500">Traffic Filtering & Data Protection</p>
        </div>
      </section>

      {/* Summary Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="p-8 bg-purple-900/10 border border-purple-500/20 rounded-3xl">
          <p className="text-lg text-gray-300 leading-relaxed font-light mb-4">
            Coming from a <span className="text-purple-400 font-medium">pure languages and arts background</span> with virtually no prior formal training in science or engineering, I made a conscious decision to move to Singapore and pursue Computer Science to challenge my computational and analytical boundaries. Although the transition presented a steep learning curve, I have systematically overcome these obstacles through relentless technical adaptability, curiosity, and structured problem-solving.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Today, I am a Computer Science student specialising in <span className="text-white font-medium">backend infrastructure, data engineering, and system security</span>. I am passionate about building highly scalable systems and applying robust C++ and Python algorithms to solve complex traffic filtering, risk control, and data protection challenges.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Selected Projects</h2>
            <p className="text-gray-500 text-sm">Engineering robust solutions to security challenges.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1: RingCT */}
          <div className="group bg-[#160e1d] border border-white/5 p-8 rounded-3xl hover:border-purple-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">RingCT E-Voting System</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Architecting a secure e-voting platform utilising RingCT to guarantee anonymous and verifiable voting.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">Final Year Project</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">Cryptography</span>
            </div>
          </div>

          {/* Project 2: Ad Traffic (Added Link) */}
          <div className="group bg-[#160e1d] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-6 items-center">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Cpu size={24} />
                </div>
                <a href="https://github.com/noratou/AdFiltered" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-400 transition-colors">
                  <ExternalLink size={20} />
                </a>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ad Traffic Filtering System</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Engineered an automated C++ logging backend using click-time analysis and frequency tracking to filter redundant ad downloads. Minimised processing overhead and optimised server resource allocation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">C++</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">Backend</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">Risk Control</span>
            </div>
          </div>

          {/* Project 3: Crypto Protocol */}
          <div className="group bg-[#160e1d] border border-white/5 p-8 rounded-3xl hover:border-purple-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                  <Lock size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cryptographic Protocol Implementation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Programmed robust C++ implementations of complex algorithms including RSA key generation, digital signatures, and hash functions. Successfully transitioned theoretical cipher models into secure architecture.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">System Security</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">C++</span>
            </div>
          </div>

          {/* Project 4: Hackathon (Added Link) */}
          <div className="group bg-[#160e1d] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-6 items-center">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Layout size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">HackXperience 2025 Web App</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Architected a MongoDB backend and integrated an AI recommendation API for a collaborative gift-coordination platform, streamlining user workflows and database management.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">MongoDB</span>
              <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">AI API</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="bg-[#140b1c] py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Proficiency</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">Languages</h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Python (ICT GLAD)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> C++</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> SQL / Node.js</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">Infrastructure</h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Docker / Linux</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> MySQL / PostgreSQL</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Hadoop / Hive</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">AI & Data</h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> TensorFlow</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> PySpark / Pandas</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Scikit-learn</li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">Security & Concepts</h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Cryptography</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> Blockchain / RingCT</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-purple-600 shrink-0" /> System Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Nora Pan Ting-Yu. Built with React & Tailwind CSS.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <Globe size={16} />
          <span>Singapore / Taiwan</span>
        </div>
      </footer>
    </div>
  );
}