import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, MessageCircle, Github, FileText, Download } from 'lucide-react';
import Scene from './Scene';
import AvatarChatbot from './AvatarChatbot';

import HtmlIcon from '../html.svg';
import CssIcon from '../css.svg';
import JavascriptIcon from '../javascript.svg';
import ReactIcon from '../react.svg';
import FigmaIcon from '../figma.svg';
import CanvaIcon from '../canva.svg';
import CommunicationIcon from '../communication.svg';
import IotIcon from '../iot.svg';

const Portfolio = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);

  const allProjects = [
    {
      id: 1,
      title: 'Internship',
      category: 'Internships',
      cover: '/display/internship-cover.jpeg',
      description: 'I have completed enriching internships in UI/UX Design and Internet of Things (IoT) with Cognifyz Technologies, Tamizhan Skills, and NoviTech R&D Pvt. Ltd., where I explored both creative design and technical problem-solving.',
      details: 'Across these experiences, I worked on diverse and exciting projects that shaped my learning journey.',
      display: ['/display/certificates/internship/agent-1.png','/display/certificates/internship/agent-2.png','/display/certificates/internship/agent-3.png','/display/certificates/internship/ilink.png','/display/certificates/internship/cc.jpeg', '/display/certificates/internship/certificate.jpg', '/display/certificates/internship/novi.jpg'],
      tools: ['Figma', 'User Research', 'Prototyping', 'IoT'],
    },
    {
      id: 2,
      title: 'Workshop',
      category: 'Workshops',
      cover: '/display/workshop-cover.jpeg',
      description: 'I have participated in workshops on Flutter App Development at Kongu Engineering College and Blockchain & Cryptocurrency at Sri Eshwar College of Engineering, which helped me explore both mobile app development and emerging technologies.',
      details: 'The Flutter workshop at Kongu Engineering College gave me hands-on exposure to cross-platform app development concepts.',
      display: ['/display/certificates/workshop/kongu.jpg', '/display/certificates/workshop/tech.jpg'],
      tools: ['Flutter', 'Linux'],
    },
    {
      id: 3,
      title: 'Certification courses',
      category: 'Course Completion',
      cover: '/display/figma-course-cover.jpg',
      description: 'I have a solid foundation in both digital design and web development, with certifications in Figma, Canva, and web design.',
      details: 'My coursework began with an Introduction to Web Design and Development...',
      display: ['/display/certificates/coursecompletion/certificate.jpg', '/display/certificates/coursecompletion/lc.jpeg','/display/certificates/coursecompletion/lin.jpg','/display/certificates/coursecompletion/novitech.jpg'],
      tools: ['Figma', 'Canva', 'Visual studio code', 'Arduino'],
    },
    {
      id: 4,
      title: 'Hackathon',
      category: 'Hackathons',
      cover: '/display/hackathon-cover.jpg',
      description: 'I have actively participated in a variety of technical hackathons, which highlight my skills in developing innovative solutions under pressure.',
      details: 'My experience in hackathons demonstrates my ability to apply technical knowledge...',
      display: ['/display/certificates/hackathon/3.jpg','/display/certificates/hackathon/aironbid.mp4','/display/certificates/hackathon/biot.mp4','/display/certificates/hackathon/fortifi.mp4','/display/certificates/hackathon/i2p.mp4','/display/certificates/hackathon/inventicon.mp4','/display/certificates/hackathon/soch 360.mp4','/display/certificates/hackathon/ilink.png','/display/certificates/hackathon/fortifi.png','/display/certificates/hackathon/intel.jpg', '/display/certificates/hackathon/sindhanai.jpg','/display/certificates/hackathon/jan.jpg','/display/certificates/hackathon/rama.jpg',],
      tools: ['Figma', 'AI', 'wireshark', 'Opencv', 'Python', 'React.js'],
    },
    {
      id: 5,
      title: 'Project Expo',
      category: 'Project Expo',
      cover: '/display/project-expo-cover.webp',
      description: 'I have actively participated in multiple Project Expos at the national and college levels, showcasing my technical projects and gaining valuable experience.',
      details: 'My involvement in Project Expos demonstrates my ability to develop and present innovative projects.',
      display: ['/display/certificates/project expo/care.jpg', '/display/certificates/project expo/hardware output.mp4', '/display/certificates/project expo/software output.mp4', '/display/certificates/project expo/velammal.jpg'],
      tools: ['React', 'Node.js', 'MongoDB', 'Figma'],
    },
    {
      id: 6,
      title: 'The Ministry of Micro , Small and Medium Enterprises',
      category: 'MSME',
      cover: '/display/msme-cover.webp',
      description: 'My MSME experience began at the AIC RAISE Business Incubator in Coimbatore, where my team and I presented our concept for a Firefighter UAV.',
      details: 'Following our initial venture, we applied again to the SRM Institute of Science & Technology...',
      display: ['/display/certificates/msme/uav.jpeg','/display/certificates/msme/fp.png','/display/certificates/msme/factoryPulse logo.jpeg'],
      tools: ['UAV-Flysky(i6)', 'Robotic arm', 'ESP32', 'Arduino'],
    },
    {
      id: 7,
      title: 'Design Projects',
      category: 'Design Projects',
      cover: '/display/ui-ux-cover.webp',
      description: 'I have completed many projects, but I am showcasing a few of my most remarkable ones here. This collection demonstrates my ability to design for different audiences.',
      details: 'My work on the "Zero Hunger" platform involved creating an accessible website...',
      display: ['/display/certificates/Design projects/viral hover naruto.mp4','/display/certificates/Design projects/iPhone 16 Pro Max - 1.png','/display/certificates/Design projects/MacBook Pro 14_- 1.png','/display/certificates/Design projects/Mockup 12.png','/display/certificates/Design projects/MODIFIED (2).png','/display/certificates/Design projects/all.mp4','/display/certificates/Design projects/intel.mp4'],
      tools: ['Figma', 'Canva'],
    },
  ];

  const skills = [
    { name: 'HTML', icon: HtmlIcon, proficiency: 60 },
    { name: 'CSS', icon: CssIcon, proficiency: 60 },
    { name: 'JavaScript', icon: JavascriptIcon, proficiency: 60 },
    { name: 'React', icon: ReactIcon, proficiency: 70 },
    { name: 'Figma', icon: FigmaIcon, proficiency: 80 },
    { name: 'Canva', icon: CanvaIcon, proficiency: 80 },
    { name: 'Communication', icon: CommunicationIcon, proficiency: 75 },
    { name: 'IoT', icon: IotIcon, proficiency: 75 },
  ];

  const handleViewResume = () => {
    const resumePath = '/KAVIN C.pdf';
    window.open(resumePath, '_blank');
  };

  const handleDownload = () => {
    const resumePath = '/KAVIN C.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Kavin_C_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-screen relative bg-[#020205] overflow-hidden font-sans">
      {/* 3D Scene Background */}
      <Scene projects={allProjects} skills={skills} setActiveProject={setActiveProject} />

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl w-full h-full overflow-y-auto scroll-smooth text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
            
            {/* Back Button */}
            <button 
              onClick={() => setActiveProject(null)}
              className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8 md:mb-12 text-base md:text-lg font-medium">
              <span>&larr;</span>
              <span>Back to Projects</span>
            </button>
            
            {/* Header Text */}
            <div className="mb-8 md:mb-12">
              <span className="text-xs md:text-sm uppercase tracking-widest text-slate-400 mb-2 block font-semibold">{activeProject.category}</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">{activeProject.title}</h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-5xl mb-4">{activeProject.description}</p>
              <p className="text-slate-400 text-sm md:text-md leading-relaxed max-w-5xl">{activeProject.details}</p>
            </div>
            
            {/* Gallery (including Cover) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
              {/* Note: Cover is omitted here as it's already in 3D space, or can be kept if user wants, but user asked for "cover also coming inside remove it". */}
              {activeProject.display.map((media, idx) => {
                const isVideo = media.endsWith('.mp4');
                return isVideo ? (
                  <video key={idx} src={media} controls autoPlay loop className="w-full h-48 md:h-64 object-cover rounded-xl border border-white/60 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => setFullScreenMedia(media)} />
                ) : (
                  <img key={idx} src={media} alt={`${activeProject.title} view ${idx}`} className="w-full h-48 md:h-64 object-cover rounded-xl border border-white/60 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => setFullScreenMedia(media)} />
                );
              })}
            </div>

            {/* Tools Used */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-white">Tools & Tech</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {activeProject.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/20 bg-white/10 shadow-sm text-white text-xs md:text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Full Screen Media Overlay Lightbox */}
      {fullScreenMedia && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center backdrop-blur-3xl w-full h-full text-white">
          <button 
            onClick={() => setFullScreenMedia(null)}
            className="absolute top-6 left-4 md:top-12 md:left-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-base md:text-lg font-medium z-10">
            <span>&larr;</span>
            <span>Back to Details</span>
          </button>
          
          <div className="w-full h-full p-4 pt-16 md:p-20 flex justify-center items-center">
            {fullScreenMedia.endsWith('.mp4') ? (
              <video src={fullScreenMedia} controls autoPlay loop className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/20" />
            ) : (
              <img src={fullScreenMedia} alt="Fullscreen View" className="max-w-full max-h-full rounded-lg shadow-2xl object-contain border border-white/20" />
            )}
          </div>
        </div>
      )}

      {/* Persistent HTML Overlay (Header) */}
      <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-10 pointer-events-none text-white">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold tracking-wider">KC.</h1>
        </div>
        <div className="flex space-x-2 md:space-x-4 pointer-events-auto">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base glass-panel rounded-full hover:bg-white/20 transition-all font-semibold flex items-center space-x-2 text-white"
          >
            {showOverlay ? 'Hide HUD' : 'Show HUD'}
          </button>
        </div>
      </header>

      {/* Fixed Bottom UI overlay */}
      <div className={`fixed bottom-0 left-0 w-full transition-opacity duration-700 pointer-events-none z-10 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-0 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Social Links */}
        <div className="flex flex-wrap justify-center space-x-3 md:space-x-4 pointer-events-auto glass-panel p-2 rounded-full">
          {[
            { icon: Mail, link: 'https://mail.google.com/mail/?view=cm&to=kavinanimation0405@gmail.com' },
            { icon: Linkedin, link: 'https://linkedin.com/in/kavin040405' },
            { icon: Github, link: 'https://github.com/kavin-04' },
            { icon: Instagram, link: 'https://instagram.com/kabot_0405' },
            { icon: MessageCircle, link: 'https://wa.me/9159040656' }
          ].map((social, idx) => (
            <a key={idx} href={social.link} target="_blank" rel="noreferrer" className="p-2 md:p-3 bg-transparent rounded-full hover:bg-white/20 text-white transition-all hover:scale-110 flex items-center justify-center">
              <social.icon className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto pointer-events-auto">
          <button onClick={handleViewResume} className="glass-panel w-full sm:w-auto text-sm md:text-base px-5 py-3 md:px-6 md:py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-all hover:-translate-y-1 hover:shadow-lg">
            View Resume
          </button>
          <button onClick={handleDownload} className="glass-panel w-full sm:w-auto text-sm md:text-base px-5 py-3 md:px-6 md:py-3 rounded-lg text-white font-semibold hover:bg-white/20 transition-all hover:-translate-y-1 hover:shadow-lg">
            Download Resume
          </button>
        </div>
      </div>

      {/* Avatar Chatbot Overlay */}
      <AvatarChatbot />
    </div>
  );
};

export default Portfolio;
