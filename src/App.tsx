import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { Menu, Mic, Play, ArrowRight, ShieldCheck, Waves } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<null | 'voice' | 'film' | 'case'>(null);

  const Lightbox = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-brand-brown/90 backdrop-blur-xl" onClick={onClose} />
          
          {/* Modal Container with Metallic Border */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl p-[3px] rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            style={{ background: "linear-gradient(160deg, #F0DBA5 0%, #C49859 40%, #5E3917 100%)" }}
          >
            <div className="w-full h-full bg-[#22140D] rounded-[21px] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4ADE80]">{title}</span>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const Counter = ({ value, suffix = "" }: { value: number, suffix: string }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);
    const isVisible = useInView(nodeRef, { once: true, amount: 0.5 });

    useEffect(() => {
      if (isVisible) {
        const controls = animate(0, value, {
          duration: 2.5,
          ease: "easeOut",
          onUpdate: (v) => setCount(Math.floor(v)),
        });
        return controls.stop;
      }
    }, [isVisible, value]);

    return <span ref={nodeRef}>{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-brown font-sans overflow-x-hidden relative">
      {/* Global Metallic Side Borders - Made more prominent and refined */}
      <div className="fixed inset-y-0 left-0 w-[6px] md:w-[16px] z-[100]" 
           style={{ background: "linear-gradient(to bottom, #B6914D 0%, #F0DBA5 15%, #E6D49C 30%, #C4A15E 50%, #8C6A31 70%, #E6D49C 85%, #5E461A 100%)" }} />
      <div className="fixed inset-y-0 right-0 w-[6px] md:w-[16px] z-[100]" 
           style={{ background: "linear-gradient(to bottom, #B6914D 0%, #F0DBA5 15%, #E6D49C 30%, #C4A15E 50%, #8C6A31 70%, #E6D49C 85%, #5E461A 100%)" }} />

      {/* 1. Hero Section */}
      <section className="relative w-full h-screen min-h-[850px] flex flex-col items-center overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Wheat field at sunset"
            className="w-full h-full object-cover"
          />
          {/* Enhanced cinematic gradient for better depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#271A12]/60" />
        </div>

        {/* Floating Pill Navigation */}
        <header className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1200px] bg-[#F5EFE6]/85 backdrop-blur-2xl rounded-full px-10 py-5 flex justify-between items-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/40">
          <div className="text-[#2D1A13] font-serif font-medium tracking-[0.4em] text-lg pl-2 uppercase">
            FIELDMIND
          </div>
          <nav className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.25em] font-bold text-[#2D1A13]/40">
            <a href="#" className="text-[#276F40] relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-[#276F40]">The Archive</a>
            <a href="#" className="hover:text-[#2D1A13] transition-colors">Botany</a>
            <a href="#" className="hover:text-[#2D1A13] transition-colors">Sustainability</a>
            <a href="#" className="hover:text-[#2D1A13] transition-colors">Journal</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-[#2D1A13] text-[#F5EFE6] px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg cursor-pointer">
              Inquire
            </button>
            <button className="lg:hidden p-2 text-[#2D1A13]">
              <Menu size={22} />
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">
          <h1 className="font-serif text-[4rem] sm:text-6xl md:text-7xl lg:text-[8.5rem] text-white max-w-[1300px] leading-[0.85] font-normal tracking-[-0.03em] drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            Smart farming for the <br className="hidden md:block"/> fields without signal.
          </h1>

          {/* Interactive Mic Widget (Tombstone Shape) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 md:mt-20 relative"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsListening(!isListening);
                setActiveLightbox('voice');
              }}
              className={`p-[2px] rounded-t-[140px] rounded-b-2xl shadow-[0_50px_100px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 ${
                isListening ? 'shadow-[0_0_80px_rgba(74,222,128,0.5)]' : ''
              }`}
              style={{
                background: "linear-gradient(160deg, #F0DBA5 0%, #C49859 40%, #5E3917 100%)",
              }}
            >
              <div className="w-[180px] h-[240px] md:w-[240px] md:h-[320px] rounded-t-[138px] rounded-b-[14px] bg-[#1A0F0A] flex flex-col items-center justify-center gap-8 relative overflow-hidden">
                <span className="text-[#4ADE80] font-sans font-semibold text-lg tracking-wider">Mic</span>
                
                <div className="relative flex items-center justify-center">
                  {isListening && (
                    <motion.div 
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-[#4ADE80] rounded-full blur-xl"
                    />
                  )}
                  <Mic size={54} strokeWidth={1.2} className={isListening ? "text-[#4ADE80] relative z-10" : "text-white/90 relative z-10"} />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-[11px] text-white/50 tracking-[0.3em] uppercase font-bold text-center">
                    VOICE ASSISTANT
                  </span>
                  <span className="text-[10px] md:text-[11px] text-white/50 tracking-[0.3em] uppercase font-bold text-center">
                    ACTIVE
                  </span>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. Problems Section */}
      <section className="relative z-20 w-full bg-[#271A12] text-[#FDF8EB] py-14 md:py-24 px-10 md:px-24 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-28 md:gap-32">
          
          {/* 01 */}
          <div className="flex flex-row items-start gap-8 md:gap-12 w-full md:w-[75%]">
            <div className="text-5xl md:text-[6rem] font-serif text-[#B69D80] opacity-30 leading-[0.8] pt-1">01</div>
            <div>
              <div className="text-[#6A8F4E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">The Information Gap</div>
              <h2 className="text-3xl md:text-[2.5rem] font-serif mb-5 leading-tight text-[#F5EFE6]">No Hyper Local Data.</h2>
              <p className="text-[#D4CFC6] opacity-70 text-[13px] md:text-[14px] leading-[1.8] max-w-[340px] font-sans">
                Advice built for districts and states misses the exact soil, weather pocket, and crop condition of a small farm plot.
              </p>
            </div>
          </div>

          {/* 02 */}
          <div className="flex flex-row-reverse justify-start items-start gap-8 md:gap-12 w-full md:w-[75%] self-end">
            <div className="text-5xl md:text-[6rem] font-serif text-[#B69D80] opacity-30 leading-[0.8] pt-1">02</div>
            <div className="text-left w-full max-w-[380px]">
              <div className="text-[#6A8F4E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">The Connectivity Void</div>
              <h2 className="text-3xl md:text-[2.5rem] font-serif mb-5 leading-tight text-[#F5EFE6]">No Connectivity.</h2>
              <p className="text-[#D4CFC6] opacity-70 text-[13px] md:text-[14px] leading-[1.8] max-w-[340px] font-sans">
                When guidance depends on a strong signal, it disappears at the field edge where farmers actually need it.
              </p>
            </div>
          </div>

          {/* 03 */}
          <div className="flex flex-row items-start gap-8 md:gap-12 w-full md:w-[75%]">
            <div className="text-5xl md:text-[6rem] font-serif text-[#B69D80] opacity-30 leading-[0.8] pt-1">03</div>
            <div>
              <div className="text-[#6A8F4E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">The UI Barrier</div>
              <h2 className="text-3xl md:text-[2.5rem] font-serif mb-5 leading-tight text-[#F5EFE6]">Literacy Barriers.</h2>
              <p className="text-[#D4CFC6] opacity-70 text-[13px] md:text-[14px] leading-[1.8] max-w-[340px] font-sans">
                Long menus, dense text, and English-heavy interfaces create distance instead of trust for everyday farm decisions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Features Section */}
      <section className="w-full bg-[#FDF8EB] py-14 md:py-20 px-10 md:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#3E2919]/30 font-bold block mb-4">
              ARCHITECTED FOR RESILIENCE
            </span>
            <h2 className="text-5xl md:text-[4.5rem] font-serif text-[#3E2919] font-normal">Built for the field.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Box 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white border border-[#3E2919]/10 rounded-2xl p-10 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
            >
              {/* Background watermark graphic */}
              <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] pointer-events-none">
                 <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="#271A12" strokeWidth="0.5"><path d="M4 12h4v8H4zM10 8h4v12h-4zM16 4h4v16h-4z"/></svg>
              </div>

              <div className="w-14 h-16 bg-[#F5EFE6] rounded-t-full flex items-center justify-center mb-8">
                <Mic size={22} className="text-[#3E2919]" strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-normal mb-5 text-[#3E2919]">Voice-First Navigation</h3>
                <p className="text-[#3E2919]/50 leading-[1.7] text-[15px] font-sans max-w-[420px]">
                  Eliminating traditional keyboards. Farmers interact naturally through localized voice AI that understands accents, dialects, and agricultural context.
                </p>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white border border-[#3E2919]/10 rounded-2xl p-10 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
            >
              {/* Background watermark graphic */}
              <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] pointer-events-none">
                 <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="#271A12" strokeWidth="0.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>

              <div className="w-14 h-16 bg-[#F5EFE6] rounded-t-full flex items-center justify-center mb-8">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3E2919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.73 5.08A2 2 0 0 1 14 6.5V11M21.17 8.22a2 2 0 0 0-2.34-1.29"/><path d="M2.83 15.78a2 2 0 0 0 2.34 1.29"/><path d="M13.27 18.92A2 2 0 0 1 10 17.5V13"/><path d="M2 2l20 20"/></svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-normal mb-5 text-[#3E2919]">Offline-First System</h3>
                <p className="text-[#3E2919]/50 leading-[1.7] text-[15px] font-sans max-w-[420px]">
                  Intelligence that lives on the device. All models run locally, processing farm imagery and sensor data without requiring a single bar of signal.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Story / Overlay Section */}
      <section className="w-full relative h-[600px] md:h-[900px] overflow-hidden flex items-center justify-center">
        {/* Background with Man Shifted Right */}
        <div className="absolute inset-0">
          <img
            src="/images/farmer.jpg"
            alt="Farmer using smartphone in the field"
            className="w-full h-full object-cover object-[80%_center]"
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-24 flex justify-center md:justify-end md:pr-40">
          {/* Rectangle Card Shifted Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[800px] bg-[#E1D9C1] p-10 md:p-20 text-left shadow-[0_40px_100px_rgba(0,0,0,0.25)] rounded-none border border-black/5"
          >
            <h2 className="text-[2.75rem] md:text-[4.75rem] font-serif text-[#2D1A13] leading-[1.05] font-normal mb-8 tracking-tight">
              Intelligence that reaches the last mile.
            </h2>
            <p className="text-[#2D1A13]/70 text-[15px] md:text-[17px] leading-[1.7] font-sans max-w-[550px] mb-12">
              Bridging the gap between satellite data and soil reality, delivered through an interface that respects the user's journey.
            </p>
            
            <motion.button
              onClick={() => setActiveLightbox('case')}
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-3 border-b border-[#2D1A13]/20 pb-2 hover:border-[#2D1A13] transition-all cursor-pointer group"
            >
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#2D1A13]">
                VIEW CASE STUDIES
              </span>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#2D1A13" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 5. App Mockups Section */}
      <section className="w-full bg-[#FDF8EB] py-24 overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-4 relative flex flex-col items-center">
          {/* Centered Phone Grid */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-20">
            
            {/* Phone 1 (Voice Finder) */}
            <div className="flex flex-col items-center gap-6 transition-transform duration-500 hover:z-20">
              <motion.button 
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[140px] sm:w-[180px] md:w-[260px] aspect-[1/2.1] bg-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-[5px] md:p-[10px] relative shrink-0 cursor-pointer overflow-hidden"
                style={{ background: "linear-gradient(to bottom, #E6DCC5, #C4B295)" }}
              >
                <div className="w-full h-full bg-[#1B6B3E] rounded-[2.6rem] md:rounded-[4rem] flex flex-col items-center justify-center p-6 text-white text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/20 flex items-center justify-center mb-8">
                     <div className="w-8 h-8 border-2 border-white/40 rounded-lg"></div>
                  </div>
                  <div className="text-lg md:text-2xl font-serif mb-2 leading-tight">बोलिए, मैं सुन रही हूँ</div>
                  <div className="text-[9px] uppercase tracking-widest opacity-60">Recording your farm details...</div>
                  
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </motion.button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#271A12]/40 uppercase">VOICE FINDER</span>
            </div>

            {/* Phone 2 (Decision Mapping) */}
            <div className="flex flex-col items-center gap-6">
              <motion.button 
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[150px] sm:w-[200px] md:w-[280px] aspect-[1/2.1] bg-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] p-[5px] md:p-[10px] relative shrink-0 z-10 cursor-pointer overflow-hidden"
                style={{ background: "linear-gradient(to bottom, #E6DCC5, #C4B295)" }}
              >
                <div className="w-full h-full bg-[#F5F2EA] rounded-[2.6rem] md:rounded-[4rem] p-6 relative flex flex-col">
                  <div className="w-8 h-8 bg-[#3E2919] rounded-lg mb-6 shadow-sm"></div>
                  
                  <div className="flex-1 w-full bg-gradient-to-b from-black/5 to-transparent rounded-2xl"></div>

                  <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-black/[0.03]">
                    <div className="text-[9px] uppercase tracking-widest text-[#271A12]/40 font-bold mb-1">HEALTH INDEX</div>
                    <div className="text-sm font-serif text-[#271A12]">Optimum Soil<br/>Moisture</div>
                    <div className="mt-4 w-full h-1 bg-[#F5F2EA] rounded-full overflow-hidden">
                       <div className="w-[70%] h-full bg-[#1B6B3E]"></div>
                    </div>
                  </div>
                </div>
              </motion.button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#271A12]/40 uppercase">DECISION MAPPING</span>
            </div>

            {/* Phone 3 (Smart Advisory) */}
            <div className="flex flex-col items-center gap-6">
              <motion.button 
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[140px] sm:w-[180px] md:w-[260px] aspect-[1/2.1] bg-white rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-[5px] md:p-[10px] relative shrink-0 cursor-pointer overflow-hidden"
                style={{ background: "linear-gradient(to bottom, #E6DCC5, #C4B295)" }}
              >
                <div className="w-full h-full bg-[#FDFDFD] rounded-[2.6rem] md:rounded-[4rem] p-6 flex flex-col gap-4">
                  <div className="w-full bg-[#FDF8EB] border border-[#E6DCC5] rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full bg-[#1B6B3E]/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#1B6B3E] rounded-full"></div>
                       </div>
                       <span className="text-[8px] font-bold text-[#1B6B3E]">Heavy Rain Expected</span>
                    </div>
                    <p className="text-[7px] text-[#271A12]/50 leading-tight">Delay harvest by 48 hours to prevent crop quality.</p>
                  </div>

                  <div className="w-full bg-red-50 border border-red-100 rounded-xl p-3 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                       </div>
                       <span className="text-[8px] font-bold text-red-600 uppercase">Pest Alert: Fall Armyworm</span>
                    </div>
                    <p className="text-[7px] text-red-900/40 leading-tight">Reported spread within 2km radius of your farm.</p>
                  </div>
                </div>
              </motion.button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#271A12]/40 uppercase">SMART ADVISORY</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Stats Section */}
      <section className="w-full px-4 md:px-8 mb-12">
        <div className="max-w-[1200px] mx-auto p-[3px] rounded-t-[6.2rem] md:rounded-t-[10.2rem] rounded-b-[1.2rem]"
             style={{ background: "linear-gradient(160deg, #F0DBA5 0%, #C49859 40%, #5E3917 100%)" }}>
        <div className="w-full h-full bg-[#1B6B3E] rounded-t-[6rem] md:rounded-t-[10rem] rounded-b-[1rem] p-12 md:p-24 text-[#FDF8EB] flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          <div className="max-w-md">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 block mb-6">GLOBAL RESILIENCE</span>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif leading-[1.1] mb-8">
              Securing the <br/>future of food.
            </h2>
            <p className="text-[#FDF8EB]/70 text-[14px] leading-relaxed max-w-[320px]">
              Our mission is to empower those who feed us with the intelligence they deserve, irrespective of their location or language.
            </p>
          </div>

          <div className="flex flex-col gap-14 w-full md:w-auto md:min-w-[300px]">
            <div className="border-t border-white/20 pt-8">
              <div className="text-6xl md:text-[5rem] font-serif mb-2 leading-none">
                <Counter value={550} suffix="M+" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">SMALLHOLDER FARMERS WORLDWIDE</p>
            </div>
            <div className="border-t border-white/20 pt-8">
              <div className="text-6xl md:text-[5rem] font-serif mb-2 leading-none">
                <Counter value={30} suffix="%" />
              </div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">AVERAGE CROP LOSS REDUCTION</p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* 7. CTA Section */}
      <section className="w-full bg-[#FDF8EB] py-16 md:py-20 px-10 md:px-24 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <h2 className="text-[2.75rem] md:text-[4.5rem] font-serif mb-8 leading-[1.1] text-[#271A12]">
            Your farm. Your data. <br/> Your decision.
          </h2>
          <p className="text-[#271A12]/50 mb-14 text-[14px] md:text-[15px] leading-relaxed max-w-md">
            Start building a resilient legacy today. Download the FieldMind app and experience intelligence without limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#271A12] text-[#FDF8EB] px-10 py-5 rounded-lg text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors shadow-xl"
            >
              DOWNLOAD ANDROID
            </motion.button>
            <motion.button 
              onClick={() => setActiveLightbox('voice')}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(39, 26, 18, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[#271A12] border border-[#271A12]/30 px-10 py-5 rounded-lg text-[11px] font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer"
            >
              TRY VOICE DEMO
            </motion.button>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="w-full px-4 md:px-8 mb-10">
        <div className="max-w-[1200px] mx-auto p-[3px] rounded-t-[5.2rem] rounded-b-[1.2rem]"
             style={{ background: "linear-gradient(160deg, #F0DBA5 0%, #C49859 40%, #5E3917 100%)" }}>
        <div className="w-full h-full bg-[#271A12] text-[#FDF8EB] pt-20 pb-10 px-6 rounded-t-[5rem] rounded-b-[1rem] flex flex-col items-center">
          <div className="text-[1.75rem] md:text-2xl tracking-[0.4em] font-medium uppercase mb-16 text-[#FDF8EB]/90">
            FIELDMIND
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[9px] tracking-[0.3em] uppercase text-[#FDF8EB]/30 font-bold mb-20">
            <a href="#" className="hover:text-white transition-colors">PROVENANCE</a>
            <a href="#" className="hover:text-white transition-colors">THE COLLECTIVE</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF HARVEST</a>
            <a href="#" className="hover:text-white transition-colors">SOCIAL STAKEHOLDERS</a>
          </div>

          <div className="w-full border-t border-white/5 pt-8 text-center text-[9px] tracking-[0.2em] uppercase text-white/20 font-medium">
             &copy; {new Date().getFullYear()} FIELDMIND. ALL RIGHTS RESERVED. BUILT FOR THE MODERN SOIL.
          </div>
        </div>
        </div>
      </footer>

      {/* Lightbox Instances */}
      <Lightbox 
        isOpen={activeLightbox === 'voice'} 
        onClose={() => setActiveLightbox(null)} 
        title="FieldMind Voice Assistant"
      >
        <div className="flex flex-col items-center text-center gap-8 py-4">
          <div className="w-32 h-32 rounded-full border-2 border-[#4ADE80]/30 flex items-center justify-center relative">
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-[#4ADE80] rounded-full blur-xl"
            />
            <Mic size={48} className="text-[#4ADE80] relative z-10" />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-white mb-4 italic">"How is the soil health in sector 4?"</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
              Our AI is processing your request using local edge models. No internet connection required.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
              <ShieldCheck className="text-[#4ADE80] mb-3" size={24} />
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Local Privacy</div>
              <div className="text-white text-xs">All voice data remains on-device.</div>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-left">
              <Waves className="text-[#4ADE80] mb-3" size={24} />
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Low Latency</div>
              <div className="text-white text-xs">Instant feedback even in dead zones.</div>
            </div>
          </div>
        </div>
      </Lightbox>

      <Lightbox 
        isOpen={activeLightbox === 'case'} 
        onClose={() => setActiveLightbox(null)} 
        title="Global Impact Studies"
      >
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden relative group">
               <img src="/images/hero-bg.jpg" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" alt="Case study" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                   <Play size={20} className="text-white fill-white" />
                 </div>
               </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-[10px] text-[#4ADE80] font-bold tracking-widest uppercase">UPCOMING IMPACT</div>
              <h3 className="text-3xl font-serif text-white leading-tight">The 550M Smallholder Transition</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Examining the deployment of offline-first AI in the most remote agricultural regions of Southeast Asia and Africa.
              </p>
              <button className="flex items-center gap-2 text-white font-bold text-[10px] tracking-widest uppercase mt-4 hover:gap-4 transition-all">
                READ FULL REPORT <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </Lightbox>

    </div>
  );
}