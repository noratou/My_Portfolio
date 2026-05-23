import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, ShieldCheck, Database, Cpu, Code2, Globe, 
  ChevronRight, ExternalLink, Lock, Layout, ChevronDown, Terminal, ArrowLeft, Zap
} from 'lucide-react';

// ==========================================
// 1. CUSTOM HOOK: CRYPTO DECRYPTION EFFECT
// ==========================================
const useDecryptionEffect = (targetText: string, speed: number = 25) => {
  const [text, setText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const chars = "01$#X_@&%!?*+=ABCDEFGHIJKLMNO_";

  const trigger = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setText(targetText.split("").map((letter, index) => {
        if (letter === " ") return " ";
        if (index < iterations) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iterations >= targetText.length) {
        clearInterval(interval);
        setIsDecrypting(false);
      }
      iterations += 1 / 2; 
    }, speed);
  };

  useEffect(() => { trigger(); }, []);
  return { text, trigger };
};

// ==========================================
// 2. COMPONENT: NATIVE 3D TILT HOVER CARD
// ==========================================
interface TiltCardProps {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  color: string;
}

function TiltCard({ children, onClick, className, color }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 15;
    const rotateY = (x - xc) / 15;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: `0px 10px 30px -10px rgba(${color === 'purple' ? '147, 51, 234' : '79, 70, 229'}, 0.3)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
      boxShadow: 'none'
    });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={tiltStyle} className={className}>
      {children}
    </div>
  );
}

// --- REAL CORE DATA ARRAYS (SANDBOX DEEP-DIVE VERSION) ---
const projectsData = [
  {
    id: 1,
    title: "RingCT E-Voting System",
    type: "Final Year Project",
    tags: ["Cryptography", "Blockchain"],
    icon: <ShieldCheck size={24} />,
    color: "purple",
    shortDesc: "Architecting a secure e-voting platform utilising RingCT to guarantee anonymous and verifiable voting.",
    demoDetails: {
      metrics: "Core Challenge: Implementing ring confidential transactions without bloated signature sizes that slow down verification chains.",
      architecture: "Implementation Details: Built directly upon modular mathematical frameworks inspired by Willy's fail-stop signature concepts. Focused on structuring verifiable range proofs and handling ring public-key decoy matrices in C++ to block identity linkage tracking."
    },
    link: null
  },
  {
    id: 2,
    title: "Ad Traffic Filtering System",
    type: "Academic Project",
    tags: ["C++", "MongoDB", "Risk Control"],
    icon: <Cpu size={24} />,
    color: "indigo",
    shortDesc: "Engineered an automated C++ traffic logging backend using click-time analysis and frequency tracking to filter redundant ad downloads.",
    demoDetails: {
      metrics: "Core Challenge: Preventing high-frequency fraudulent log bursts from causing thread starvation or database write bottlenecks.",
      architecture: "Implementation Details: Engineered a rolling time-window queue in C++. The system caches incoming log traffic patterns in-memory, executes localized frequency differential analysis, and flushes batch updates to MongoDB Atlas only when anomalies are flagged, cutting database write overhead."
    },
    link: "https://github.com/noratou/AdFiltered"
  },
  {
    id: 3,
    title: "Cryptographic Protocol Implementations",
    type: "Academic Coursework",
    tags: ["C++", "Security"],
    icon: <Lock size={24} />,
    color: "purple",
    shortDesc: "Programmed robust C++ implementations of complex algorithms including RSA key generation, digital signatures, and hash functions.",
    demoDetails: {
      metrics: "Core Challenge: Managing large integers and preventing overflow/underflow attacks when simulating modular exponentiation.",
      architecture: "Implementation Details: Constructed raw implementations entirely from scratch without using OpenSSL. Focused heavily on memory management, byte-manipulation techniques, and optimized loop conditional boundaries to ensure mathematically sound keys and prevent basic side-channel data leakage."
    },
    link: null
  },
  {
    id: 4,
    title: "HackXperience 2025 Web App",
    type: "Hackathon Entry",
    tags: ["MongoDB", "Node.js", "AI API"],
    icon: <Layout size={24} />,
    color: "indigo",
    shortDesc: "Architected a MongoDB backend and integrated a 3rd-party AI recommendation API for a collaborative gift-coordination platform.",
    demoDetails: {
      metrics: "Core Challenge: Managing unpredictable LLM API latencies and occasional broken/malformed JSON payloads under strict 24-hour hackathon constraints.",
      architecture: "Implementation Details: Formulated aggressive regex-based payload cleaning and asynchronous error-handling middleware within Express/Node.js to handle API failures gracefully, maintaining data consistency inside NoSQL document schemas."
    },
    link: null
  }
];

// ==========================================
// 3. SUB-COMPONENT: PLAYGROUND / SANDBOX PAGE
// ==========================================
interface SandboxPageProps {
  onBack: () => void;
}

function SandboxPage({ onBack }: SandboxPageProps) {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Nora's Systems Terminal v1.2.6",
    "Type 'help' to view available system options.",
    ""
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Friendly Project Decryptor Game State
  const [decryptedProjects, setDecryptedProjects] = useState<Record<number, boolean>>({});
  const [decryptingId, setDecryptingId] = useState<number | null>(null);

  const startFriendlyDecrypt = (id: number) => {
    if (decryptedProjects[id] || decryptingId !== null) return;
    setDecryptingId(id);
    setTimeout(() => {
      setDecryptedProjects(prev => ({ ...prev, [id]: true }));
      setDecryptingId(null);
    }, 1200); 
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];
    switch(cmd) {
      case 'help':
        response = ["Available parameters:", "  whoami       - Display short summary info", "  ls           - List portfolio project files", "  cat skills   - Show technical stack details", "  clear        - Clear console history"]; break;
      case 'whoami':
        response = ["Nora Pan Ting-Yu | Computer Science Double Major", "Focusing on backend architecture, AI pipelines, systems data streams, and cryptography.", "Moved from a languages/arts background into core computer science through relentless technical adaptability."]; break;
      case 'ls':
        response = ["Directories found:", "  - RingCT_EVoting_System.bin", "  - Ad_Traffic_Filter_Engine.cpp", "  - Crypto_Protocol_Suite.exe", "  - HackXperience_AI_Backend.node"]; break;
      case 'cat skills':
        response = ["--- REPOSITORIES SKILL PACK ---", "Languages:      Python, C++, SQL, JavaScript, HTML", "Databases/BigD: MySQL, PostgreSQL, MongoDB, Hadoop, HDFS, Hive, HBase", "Tools/Concepts: Git, Docker, Cloud Deployment (Render), SDLC, Cryptography Frameworks"]; break;
      case 'clear':
        setTerminalHistory([]); setTerminalInput(""); return;
      default:
        response = [`bash: command unknown: ${cmd}. Execute 'help' to list nodes.`];
    }
    setTerminalHistory(prev => [...prev, `guest@nora_portfolio:~$ ${terminalInput}`, ...response, ""]);
    setTerminalInput("");
  };

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fadeIn">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-mono mb-12 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO PORTFOLIO HOME
      </button>
      
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-3">Interactive Sandbox</h2>
        <p className="text-gray-400 text-sm max-w-2xl font-light">Explore academic command modules and interact with project decryption nodes to review stack capabilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Terminal Section */}
        <div className="lg:col-span-2 flex flex-col h-[400px] bg-black/80 rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden font-mono text-xs">
          <div className="bg-[#160e1d] px-4 py-2 flex items-center gap-2 border-b border-purple-500/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-gray-500 ml-2 text-[10px] flex items-center gap-1"><Terminal size={12}/> local_shell@nora_portfolio</span>
          </div>
          <div ref={terminalContainerRef} className="p-4 flex-grow overflow-y-auto space-y-1 text-purple-300 scroll-smooth">
            {terminalHistory.map((line, index) => <div key={index} className="whitespace-pre-wrap">{line}</div>)}
            <form onSubmit={handleTerminalSubmit} className="flex items-center">
              <span className="text-indigo-400 shrink-0">guest@nora_portfolio:~$ &nbsp;</span>
              <input type="text" value={terminalInput} onChange={(e) => setTerminalInput(e.target.value)} className="bg-transparent focus:outline-none flex-grow text-white caret-purple-500" placeholder="type 'help'..." autoComplete="off" spellCheck="false"/>
            </form>
          </div>
        </div>

        {/* PROJECT DECRYPTOR */}
        <div className="bg-[#160e1d] border border-purple-500/20 p-6 rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-3 text-purple-400 font-mono text-xs font-bold tracking-wider">
              <Zap size={14} className="animate-bounce" /> PROJECT_DECRYPTOR_v2
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">Click on any core module to crack the data cipher and extract targeted project analytics instantly.</p>
            
            <div className="space-y-3">
              {projectsData.map((project) => {
                const isDone = decryptedProjects[project.id];
                const isLoading = decryptingId === project.id;

                return (
                  <div key={project.id} className="border border-white/5 bg-black/30 rounded-xl p-3 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white text-xs font-bold truncate max-w-[140px]">{project.title}</span>
                      <button 
                        onClick={() => startFriendlyDecrypt(project.id)}
                        disabled={isDone || isLoading}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded transition-all ${
                          isDone ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          isLoading ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse' :
                          'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isDone ? "[UNLOCKED]" : isLoading ? "CRACKING..." : "DECRYPT"}
                      </button>
                    </div>

                    <div className="overflow-hidden transition-all duration-300">
                      {isDone ? (
                        <div className="text-[10px] font-mono text-indigo-300 mt-2 pt-2 border-t border-white/5 space-y-1">
                          <p className="text-green-400">✓ DATA EXTRACTED:</p>
                          <p className="text-gray-400 leading-tight">{project.demoDetails.metrics}</p>
                        </div>
                      ) : isLoading ? (
                        <div className="text-[9px] font-mono text-gray-600 mt-1 animate-pulse">Running hardware matrix calculations...</div>
                      ) : (
                        <div className="text-[10px] font-mono text-gray-600 mt-1">[ Status: Encrypted Packet ]</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {Object.keys(decryptedProjects).length === projectsData.length && (
            <div className="mt-4 p-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-center text-[10px] font-mono text-purple-300 animate-fadeIn">
              🎉 [SUCCESS] ALL PACKETS AUDITED. FULL ACCESS GRANTED TO NORA'S RESUME METRICS.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 4. MAIN CORE PORTFOLIO COMPONENT
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState<'resume' | 'sandbox'>('resume');
  const titleEffect = useDecryptionEffect("Nora Pan", 30);
  const headlineEffect = useDecryptionEffect("Backend & AI Software Engineer", 20);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  if (currentPage === 'sandbox') {
    return (
      <div className="min-h-screen bg-[#0f0715] text-gray-200 font-sans selection:bg-purple-500/30">
        <SandboxPage onBack={() => setCurrentPage('resume')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0715] text-gray-200 font-sans selection:bg-purple-500/30 animate-fadeIn">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-900/20 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-purple-500/10 bg-[#0f0715]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer" onClick={() => setCurrentPage('resume')}>
            NORA.PAN
          </span>
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <button onClick={() => setCurrentPage('sandbox')} className="px-3 py-1 bg-purple-600/20 border border-purple-500/40 rounded-lg text-xs font-mono text-purple-400 hover:bg-purple-600 hover:text-white transition-all animate-pulse">
              [ RUN SANDBOX ]
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://github.com/noratou" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider hover:text-purple-400 hover:border-purple-500/50 transition-all">GITHUB</a>
            <a href="https://linkedin.com/in/nora-pan" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wider hover:text-purple-400 hover:border-purple-500/50 transition-all">LINKEDIN</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center md:text-left md:flex gap-8 items-center">
        <div className="flex-1">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-bold mb-6 tracking-widest">
            AVAILABLE NOV 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight cursor-pointer select-none" onClick={titleEffect.trigger}>
            {titleEffect.text.split(" ")[0] || "Nora"} <span className="text-purple-500 italic">{titleEffect.text.split(" ")[1] || "Pan"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-8 cursor-pointer select-none" onClick={headlineEffect.trigger}>
            {headlineEffect.text || "Backend & AI Software Engineer"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="mailto:p.nora25n@gmail.com" className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20">
              <Mail size={18} /> Contact Me
            </a>
            <button onClick={() => setCurrentPage('sandbox')} className="md:hidden px-8 py-3 bg-white/5 border border-white/10 text-gray-300 font-bold rounded-full hover:bg-white/10 transition-all font-mono text-sm">
              Launch Sandbox Mode
            </button>
          </div>
        </div>

        {/* SHIELD INTRUSION NODE */}
        <div className="flex-1 hidden md:flex justify-end">
           <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative px-12 py-12 bg-[#1a1025] rounded-2xl border border-white/5 flex items-center justify-center cursor-pointer" onClick={() => setCurrentPage('sandbox')}>
                <ShieldCheck size={120} className="text-purple-500 hover:text-indigo-400 transition-colors duration-500" />
                <div className="absolute bottom-4 font-mono text-[9px] text-gray-600 tracking-wider">CLICK TO DEPLOY CORE_OS</div>
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
          <p className="text-sm text-gray-500">Mandarin (Native), English, German (B1)</p>
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
            Coming from a <span className="text-purple-400 font-medium">pure languages and arts background</span>, I made a conscious decision to move to Singapore and pursue Computer Science to challenge my analytical boundaries and dive into computational logic.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed font-light">
            Today, I am a Computer Science student specializing in <span className="text-white font-medium">Backend & AI Software Engineering</span>. I am deeply passionate about deploying intelligent data pipelines and applying robust C++ and Python algorithms to solve complex traffic filtering, risk control, and cryptographic data protection challenges.
          </p>
        </div>
      </section>

      {/* Projects Section with Native 3D Hover Tilt */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Selected Projects</h2>
            <p className="text-gray-500 text-sm">Engineering robust solutions to security challenges. (Hover to tilt, click to expand metrics)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <TiltCard key={project.id} color={project.color} className={`bg-[#160e1d] border ${expandedId === project.id ? `border-${project.color}-500/80` : 'border-white/5'} p-8 rounded-3xl flex flex-col justify-between cursor-pointer select-none`} onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}>
              <div>
                <div className="flex justify-between mb-6 items-center">
                  <div className={`p-3 bg-${project.color}-500/10 rounded-xl text-${project.color}-400`}>
                    {project.icon}
                  </div>
                  <div className="flex gap-3 items-center">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                    <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${expandedId === project.id ? 'rotate-180 text-white' : ''}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.shortDesc}</p>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === project.id ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                   <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                     <div>
                       <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Project Summary Focus</p>
                       <p className="text-sm text-gray-300">{project.demoDetails.metrics}</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-1">Technical Flow</p>
                       <p className="text-sm text-gray-300">{project.demoDetails.architecture}</p>
                     </div>
                   </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">{project.type}</span>
                {project.tags.map(tag => <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded text-gray-400 uppercase tracking-wider">{tag}</span>)}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* SKILLS GRID */}
      <section id="skills" className="bg-[#140b1c] py-24 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">Technical Proficiency</h2>
          <p className="text-gray-500 text-sm text-center mb-16">Hover over elements to view core technology categories.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Category 1: Languages */}
            <div className="group bg-[#0f0715]/60 border border-white/5 p-6 rounded-2xl hover:border-purple-500/40 hover:bg-[#160e1d] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-purple-500 to-indigo-500 group-hover:h-full transition-all duration-300" />
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 flex justify-between items-center">
                <span>01 // Languages</span>
                <span className="text-[10px] text-gray-600 font-mono">READY</span>
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ChevronRight size={14} className="text-purple-500" /> Python
                  </div>
                  <div className="pl-5 text-[10px] text-purple-400 font-mono tracking-wider">ICT GLAD Certified</div>
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-purple-600" /> C++
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-purple-600" /> SQL
                </li>
                <li className="flex items-center gap-2 py-1">
                  <ChevronRight size={14} className="text-purple-600" /> JavaScript / HTML
                </li>
              </ul>
            </div>

            {/* Category 2: Databases */}
            <div className="group bg-[#0f0715]/60 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/40 hover:bg-[#160e1d] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-indigo-500 to-purple-500 group-hover:h-full transition-all duration-300" />
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 flex justify-between items-center">
                <span>02 // Databases</span>
                <span className="text-[10px] text-gray-600 font-mono">DB.CORE</span>
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> MySQL
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> PostgreSQL
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> MongoDB
                </li>
              </ul>
            </div>

            {/* Category 3: Big Data & AI */}
            <div className="group bg-[#0f0715]/60 border border-white/5 p-6 rounded-2xl hover:border-purple-500/40 hover:bg-[#160e1d] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-purple-500 to-indigo-500 group-hover:h-full transition-all duration-300" />
              <h4 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-6 flex justify-between items-center">
                <span>03 // Big Data & AI</span>
                <span className="text-[10px] text-gray-600 font-mono">COMPUTE</span>
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ChevronRight size={14} className="text-purple-500" /> Hadoop Ecosystem
                  </div>
                  <div className="pl-5 text-[10px] text-purple-400 font-mono tracking-wider">HDFS / Hive / HBase</div>
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-purple-600" /> TensorFlow
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-purple-600" /> PySpark / Pandas
                </li>
                <li className="flex items-center gap-2 py-1">
                  <ChevronRight size={14} className="text-purple-600" /> Scikit-learn
                </li>
              </ul>
            </div>

            {/* Category 4: Tools & Concepts */}
            <div className="group bg-[#0f0715]/60 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/40 hover:bg-[#160e1d] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-indigo-500 to-purple-500 group-hover:h-full transition-all duration-300" />
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 flex justify-between items-center">
                <span>04 // Tools & Core</span>
                <span className="text-[10px] text-gray-600 font-mono">SYS.ENV</span>
              </h4>
              <ul className="space-y-4 text-gray-300 font-medium text-sm">
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> Git / Docker
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> Cryptography / Blockchain
                </li>
                <li className="flex items-center gap-2 py-1 border-b border-white/5">
                  <ChevronRight size={14} className="text-indigo-600" /> OOP / JSON / BSON / APIs
                </li>
                <li className="flex items-center gap-2 py-1">
                  <ChevronRight size={14} className="text-indigo-600" /> SDLC / System Architecture
                </li>
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