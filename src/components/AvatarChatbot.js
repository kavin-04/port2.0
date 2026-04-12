import React, { useState, useRef, useEffect } from 'react';
import { Home, Play, Square, User, MapPin, Briefcase, GraduationCap, FileCode, Activity } from 'lucide-react';

const AvatarChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const questions = [
    { id: 1, text: "Who are you?", audio: "/audio/1.mp3", icon: User },
    { id: 2, text: "Where are you from?", audio: "/audio/2.mp3", icon: MapPin },
    { id: 3, text: "What are your interested domain?", audio: "/audio/3.mp3", icon: Briefcase },
    { id: 4, text: "Education details?", audio: "/audio/4.m4a", icon: GraduationCap },
    { id: 5, text: "What was your final year project?", audio: "/audio/5.mp3", icon: FileCode }
  ];

  const handleAudioPlay = (q) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (activeQuestion === q.id && isPlaying) {
      setIsPlaying(false);
      setActiveQuestion(null);
      return;
    }

    const audio = new Audio(q.audio);
    audioRef.current = audio;
    
    audio.onended = () => {
      setIsPlaying(false);
      setActiveQuestion(null);
    };

    audio.onplay = () => {
      setIsPlaying(true);
      setActiveQuestion(q.id);
    };

    audio.play();
  };

  const closeChat = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveQuestion(null);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#02050a]/95 backdrop-blur-xl flex flex-col items-center overflow-y-auto animate-in fade-in duration-300 py-16 md:py-24">
        
        {/* Top Right Home Button */}
        <button 
          onClick={closeChat}
          className="fixed top-6 right-6 md:top-10 md:right-10 flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/30 rounded-lg px-4 py-2 border border-cyan-500/30 hover:bg-cyan-900/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] z-50">
          <Home className="w-5 h-5" />
          <span className="font-mono text-sm tracking-widest uppercase">System.Home()</span>
        </button>

        {/* HUD UI Container */}
        <div className="w-full max-w-5xl px-4 flex flex-col items-center relative">
          
          {/* Header Diagnostics */}
          <div className="w-full flex justify-between absolute top-0 px-4 text-cyan-500/70 font-mono text-xs md:text-sm tracking-widest hidden md:flex">
             <div>SYSTEM DIAGNOSTICS: ONLINE<br/>CPU TEMP: 42°C</div>
             <div className="text-right">MEM STATUS: OPTIMAL<br/>CONNECTION: SECURE</div>
          </div>

          {/* Central JARVIS HUD Avatar */}
          <div className="relative mt-12 mb-24 md:mb-32 flex justify-center items-center">
            
            {/* Inner Ring */}
            <div className={`absolute w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-full border-t-2 border-r-2 border-cyan-400/50 animate-[spin_8s_linear_infinite] pointer-events-none`}></div>
            
            {/* Middle Ring Dashed */}
            <div className={`absolute w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full border-b-2 border-l-2 border-blue-500/40 border-dashed animate-[spin_15s_linear_infinite_reverse] pointer-events-none`}></div>
            
            {/* Outer Ring with Ticks (using border styles for simplicity) */}
            <div className={`absolute w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full border-4 border-cyan-900/30 border-x-cyan-400/20 animate-[spin_25s_linear_infinite] pointer-events-none`}></div>

            {/* Scale Pulse on Audio Play */}
            {isPlaying && (
              <div className="absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-full border border-cyan-400 animate-ping opacity-30"></div>
            )}

            {/* Avatar Image */}
            <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] bg-black z-10
              ${isPlaying ? 'shadow-[0_0_80px_rgba(34,211,238,0.6)] border-cyan-400' : 'transition-all duration-500'}`}>
              <img src="/photo.png" alt="User Avatar" className="w-full h-full object-cover scale-110" />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent bg-[length:100%_10px] animate-[scan_2s_linear_infinite]"></div>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center space-x-3 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-mono font-bold tracking-[0.2em] uppercase">
              {isPlaying ? "Audio.Transmission_Active" : "Awaiting.Input_Command"}
            </h2>
          </div>

          {/* Question List (HUD Buttons) */}
          <div className="w-full max-w-3xl flex flex-col space-y-4">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleAudioPlay(q)}
                className={`relative flex items-center p-4 md:p-5 rounded-none border-l-4 transition-all duration-300 w-full text-left font-mono overflow-hidden group
                  ${activeQuestion === q.id 
                    ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100' 
                    : 'bg-black/40 border-cyan-900/50 text-cyan-600 hover:bg-cyan-950/20 hover:border-cyan-500/50 hover:text-cyan-300'
                  }`}
              >
                {/* Tech overlay on active button */}
                {activeQuestion === q.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none"></div>
                )}
                
                <div className={`p-2 mr-4 md:mr-6 border ${activeQuestion === q.id ? 'border-cyan-400 bg-cyan-500/20' : 'border-cyan-900/50 bg-black'}`}>
                  <q.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="text-xs text-cyan-700 mb-1 tracking-widest hidden md:block">CMD_QUERY_{q.id}</div>
                  <span className="text-sm md:text-lg tracking-wide uppercase">{q.text}</span>
                </div>
                
                <div className="ml-4">
                  {activeQuestion === q.id ? (
                    <div className="flex items-center space-x-2">
                       <span className="text-xs text-cyan-400 animate-pulse hidden md:inline">PLAYING</span>
                       <Square className="w-5 h-5 opacity-80" />
                    </div>
                  ) : (
                    <Play className="w-5 h-5 opacity-40 group-hover:opacity-80 transition-opacity" />
                  )}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // HUD Minified View
  return (
    <div className="fixed bottom-24 right-6 md:bottom-28 md:right-10 z-[60] pointer-events-auto">
      <div 
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        {/* Tooltip & Wave Animation */}
        <div className={`absolute bottom-full right-0 mb-4 whitespace-nowrap transition-all duration-300 origin-bottom-right
          ${isHovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-2 pointer-events-none'}`}>
          <div className="bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md text-cyan-50 px-4 py-2 rounded-xl text-sm font-medium shadow-xl flex items-center shadow-cyan-500/20 font-mono">
            <span className="mr-2 animate-[wave_2s_infinite] origin-bottom-right text-lg inline-block">👋</span>
            quick conversation you're most welcome
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full right-6 w-3 h-3 bg-slate-900 border-b border-r border-cyan-500/30 rotate-45 -translate-y-1.5"></div>
        </div>

        {/* HUD Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-cyan-800/80 shadow-lg shadow-black/50 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-500 transform group-hover:scale-110 relative bg-black">
           <img src="/photo.png" alt="Avatar HUD" className="w-full h-full object-cover scale-110" />
           <div className="absolute inset-0 ring-inset ring-2 ring-cyan-400/20 rounded-full mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default AvatarChatbot;
