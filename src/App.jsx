import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  ChevronRight, 
  Menu, 
  X, 
  Award, 
  Users, 
  HeartPulse, 
  Stethoscope, 
  Microscope,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Globe,
  Quote,
  Zap,
  Fingerprint,
  ArrowRight,
  Diamond,
  UserCheck,
  Star,
  Lock,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';

// --- Global Configuration ---

const CLINIC_INFO = {
  name: "Abha Medical Center",
  arabicName: "مركز أبها الطبي",
  address: "Premium Medical District, Downtown Dubai, UAE",
  phone: "+971 56 148 7176",
  email: "registry@abhamedical.ae"
};

const IMAGES = {
  hero: "https://image2url.com/r2/default/images/1775069808968-618b2e26-587a-40cd-a3a5-aa771994e40c.jpg",
  about: "https://image2url.com/r2/default/images/1775069511420-9a842cbe-f895-4d8d-a2ea-4035610e4ef7.jpg",
  service1: "https://image2url.com/r2/default/images/1775069673139-a7c830f5-9374-49d3-ab45-95369149740b.jpg",
  service2: "https://image2url.com/r2/default/images/1775069967168-8118aafb-9e5a-4d98-9e14-1d8078f71253.jpg",
  service3: "https://image2url.com/r2/default/images/1775069634349-7f628750-d699-4d23-9e89-cce329e900a2.jpg",
  doctor1: "https://image2url.com/r2/default/images/1775069604126-268569d7-8548-49fa-9a11-3fa7d4813935.jpg",
  doctor2: "https://image2url.com/r2/default/images/1775069849227-f68c6702-d1b1-4478-82f1-14b9c241b4a6.jpg",
  reception: "https://image2url.com/r2/default/images/1775069932331-02eaab84-d6b2-4111-82a6-95f6cf02c04b.jpg"
};

// --- Sub-Components (Premium Atoms) ---

const LuxuryText = ({ children, delay = 0 }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const SectionHeader = ({ number, title, subtitle, light = false }) => (
  <div className="mb-24">
    <div className="flex items-center gap-6 mb-8 overflow-hidden">
      <span className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059]">{number}</span>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className={`h-[1px] w-24 origin-left ${light ? 'bg-white/20' : 'bg-[#0A192F]/10'}`} 
      />
      <span className={`text-[9px] uppercase tracking-[0.6em] font-bold ${light ? 'text-white/40' : 'text-gray-400'}`}>{subtitle}</span>
    </div>
    <h2 className={`text-5xl md:text-8xl font-serif font-light leading-none tracking-tighter ${light ? 'text-white' : 'text-[#0A192F]'}`}>
      {title}
    </h2>
  </div>
);

// Service card with 40px radius and gray shadow
const ServiceCard = ({ title, desc, img, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="group relative h-[600px] overflow-hidden cursor-pointer rounded-[40px] shadow-[2px_2px_2px_gray] bg-black"
  >
    <img src={img} className="w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2.5s]" alt={title} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
    <div className="absolute bottom-0 left-0 p-10 w-full transform group-hover:-translate-y-4 transition-transform duration-700">
      <p className="text-[10px] font-bold tracking-[0.4em] text-[#C5A059] mb-4 uppercase">Center of Excellence</p>
      <h3 className="text-3xl font-serif text-white mb-6 leading-tight">{title}</h3>
      <p className="text-white/50 text-xs tracking-widest uppercase mb-8 line-clamp-2 leading-relaxed">{desc}</p>
      <div className="flex justify-between items-center overflow-hidden h-6">
        <ArrowRight className="text-white transform -translate-x-12 group-hover:translate-x-0 transition-all duration-700" size={24} />
      </div>
    </div>
  </motion.div>
);

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [registryStatus, setRegistryStatus] = useState('idle');

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegistrySubmit = (e) => {
    e.preventDefault();
    setRegistryStatus('submitting');
    setTimeout(() => setRegistryStatus('success'), 2500);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#0A192F] font-sans selection:bg-[#C5A059] selection:text-white relative">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        .gold-leaf {
          background: linear-gradient(135deg, #C5A059 0%, #F1E2C2 50%, #C5A059 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .grain-texture {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://www.transparenttextures.com/patterns/felt.png');
          opacity: 0.04;
          pointer-events: none;
          z-index: 9999;
        }

        .luxury-blur {
          backdrop-filter: blur(30px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(150%);
        }

        .premium-input {
          background: transparent;
          border-bottom: 1px solid rgba(10, 25, 47, 0.1);
          padding: 1.5rem 0;
          width: 100%;
          font-size: 1rem;
          font-weight: 300;
          transition: all 0.5s ease;
        }

        .premium-input:focus {
          border-bottom: 1px solid #C5A059;
          outline: none;
        }
      `}</style>

      <div className="grain-texture" />

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-1000 ${isScrolled ? 'bg-white/90 luxury-blur py-4 border-b border-[#C5A059]/10 shadow-sm' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <span className={`text-3xl font-serif tracking-tighter transition-colors ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}>ABHA</span>
            <span className="text-[7px] tracking-[0.8em] font-bold text-[#C5A059] uppercase mt-1">Dubai Atelier</span>
          </div>

          <div className="hidden lg:flex items-center gap-16">
            {['Expertise', 'The Board', 'Registry'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className={`text-[9px] uppercase tracking-[0.5em] font-bold transition-all hover:text-[#C5A059] relative group ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}
              >
                {item}
                <span className="absolute -bottom-3 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-10">
            <a 
              href="#registry"
              className={`hidden md:block px-10 py-4 text-[9px] font-bold uppercase tracking-[0.4em] transition-all border rounded-full ${isScrolled ? 'bg-[#0A192F] text-white border-[#0A192F]' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0A192F]'}`}
            >
              Membership Registry
            </a>
            <button onClick={() => setIsMenuOpen(true)} className="text-[#C5A059]"><Menu size={32}/></button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src={IMAGES.hero} alt="Luxury Interior" className="w-full h-full object-cover opacity-60 grayscale-[15%] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-transparent to-[#FAF9F6]" />
        </motion.div>

        <div className="container mx-auto px-10 relative z-10 text-center">
          <LuxuryText delay={0.2}>
            <span className="inline-block text-[#C5A059] text-[10px] tracking-[1.5em] uppercase font-bold mb-8">Flagship Downtown Dubai</span>
          </LuxuryText>
          
          <LuxuryText delay={0.4}>
            <h1 className="text-6xl md:text-[140px] font-serif text-white font-light tracking-tighter leading-none mb-2">
              ABHA
            </h1>
            <h2 className="text-4xl md:text-[80px] font-serif gold-leaf font-light italic mb-12 leading-none">
              Medical Center
            </h2>
          </LuxuryText>

          <LuxuryText delay={0.8}>
            <div className="flex flex-col items-center gap-12 pt-16 border-t border-white/5">
              <p className="text-[#E2D1B3]/50 max-w-xl text-[11px] md:text-[14px] tracking-[0.5em] font-light leading-loose uppercase text-center">
                Bespoke Healthcare Excellence. <br />
                A biological sanctuary for the world's most discerning patients.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                 <a 
                   href="#registry" 
                   className="px-16 py-6 bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl rounded-full hover:bg-white hover:text-[#0A192F] transition-all duration-700 w-full sm:w-auto"
                 >
                   Book Appointment
                 </a>
                 <a 
                   href="https://wa.me/971561487176" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="px-12 py-6 border border-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-4 rounded-full hover:bg-white/10 transition-all duration-500 w-full sm:w-auto justify-center"
                 >
                   <MessageCircle size={20} className="text-[#25D366]" />
                   WhatsApp
                 </a>
              </div>
            </div>
          </LuxuryText>
        </div>
      </section>

      {/* --- Section 01: Heritage --- */}
      <section id="about" className="py-60 bg-white relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
              <SectionHeader number="01" title="The Legacy" subtitle="Bespoke Care" />
              <p className="text-gray-500 text-xl font-light leading-loose mb-12 max-w-lg">
                Located in the heart of the world's most dynamic city, Abha Medical Center is where clinical precision meets unparalleled luxury. We treat your biology as a heritage piece.
              </p>
              <div className="grid grid-cols-2 gap-12">
                 {[
                   { t: "Elite Technology", i: <Microscope size={24}/> },
                   { t: "Ultimate Discretion", i: <ShieldCheck size={24}/> },
                   { t: "Expert Medical Board", i: <Award size={24}/> },
                   { t: "Global Portability", i: <Globe size={24}/> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col gap-4 p-8 bg-[#FAF9F6] rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-50">
                      <div className="text-[#C5A059]">{item.i}</div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em]">{item.t}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
               <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="relative z-10"
               >
                 {/* Image clipped by 40px container, but img tag remains sharp */}
                 <div className="rounded-[40px] overflow-hidden shadow-[2px_2px_2px_gray]">
                    <img src={IMAGES.about} className="w-full h-[700px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" alt="Excellence" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 02: Expertise --- */}
      <section id="expertise" className="py-60 bg-[#0A192F] text-white">
        <div className="container mx-auto px-10">
          <SectionHeader number="02" title="Our Expertise" subtitle="Excellence Centers" light />
          
          <div className="grid lg:grid-cols-3 gap-12">
             <ServiceCard title="Regenerative Aesthetics" desc="Biological rejuvenation through high-molecular skincare and precision technology." img={IMAGES.service1} index={0} />
             <ServiceCard title="Biological Optimization" desc="Tailored longevity protocols designed to maximize your vital performance years." img={IMAGES.service2} index={1} />
             <ServiceCard title="Precision Diagnostics" desc="Comprehensive health mapping utilizing 7T imaging and detailed molecular screening." img={IMAGES.service3} index={2} />
          </div>
        </div>
      </section>

      {/* --- Section 03: The Board --- */}
      <section id="theboard" className="py-60 bg-white">
        <div className="container mx-auto px-10 text-center mb-32">
          <SectionHeader number="03" title="Medical Board" subtitle="Authority" />
          <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl mx-auto text-center">
            Our medical specialists are leaders from world-renowned institutes, dedicated to your long-term vitality.
          </p>
        </div>
        <div className="container mx-auto px-10">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="p-12 bg-[#FAF9F6] rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-100 group">
                 <div className="overflow-hidden mb-10 h-80">
                    <img src={IMAGES.doctor1} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Specialist" />
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059] mb-2">Director of Longevity</p>
                 <h4 className="text-3xl font-serif text-[#0A192F]">Dr. Alistair Vaughn</h4>
              </div>
              <div className="p-12 bg-[#FAF9F6] rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-100 group">
                 <div className="overflow-hidden mb-10 h-80">
                    <img src={IMAGES.doctor2} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Specialist" />
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C5A059] mb-2">Chief Aesthetician</p>
                 <h4 className="text-3xl font-serif text-[#0A192F]">Dr. Laila Al-Sayed</h4>
              </div>
              <div className="p-16 bg-[#0A192F] rounded-[40px] shadow-[2px_2px_2px_gray] flex flex-col justify-center text-center">
                 <Star className="text-[#C5A059] mx-auto mb-10" size={48} />
                 <h5 className="text-2xl font-serif text-white mb-8">Clinical Governance</h5>
                 <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-[2] italic">
                   "We preserve biological heritage with Ivy League standards."
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- Section 04: Registry (Premium Form) --- */}
      <section id="registry" className="py-72 bg-[#FAF9F6] relative overflow-hidden">
         <div className="container mx-auto px-10 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 xl:gap-40">
               <div className="lg:w-2/5 flex flex-col justify-center">
                  <SectionHeader number="04" title="Membership" subtitle="The Registry" />
                  <p className="text-gray-500 font-light text-2xl leading-loose mb-16 max-w-lg">
                    Admission to Abha Medical Center is a privilege. We manage your health as an asset to be protected.
                  </p>
                  
                  <div className="space-y-10">
                     <div className="flex gap-8 group items-start p-10 bg-white rounded-[40px] shadow-[2px_2px_2px_gray]">
                        <Lock size={24} className="text-[#C5A059] shrink-0" />
                        <div>
                           <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-[#0A192F] mb-2">Secure Gateway</p>
                           <p className="text-xs text-gray-400 leading-relaxed">Your medical registry is protected by 256-bit institutional encryption.</p>
                        </div>
                     </div>
                     <div className="flex gap-8 group items-start p-10 bg-white rounded-[40px] shadow-[2px_2px_2px_gray]">
                        <Clock size={24} className="text-[#C5A059] shrink-0" />
                        <div>
                           <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-[#0A192F] mb-2">Registry Response</p>
                           <p className="text-xs text-gray-400 leading-relaxed">Applications are reviewed within 4 business hours by our concierge board.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="lg:w-3/5">
                  <div className="bg-white p-12 md:p-20 rounded-[40px] shadow-[2px_2px_2px_gray] border border-gray-100 relative overflow-hidden">
                     <AnimatePresence mode="wait">
                        {registryStatus === 'success' ? (
                           <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-20"
                           >
                              <div className="w-24 h-24 bg-[#C5A059] text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                                 <CheckCircle2 size={48} strokeWidth={1} />
                              </div>
                              <h3 className="text-4xl font-serif text-[#0A192F] mb-6">Application Registered</h3>
                              <p className="text-gray-500 max-w-md mx-auto leading-loose mb-12">
                                Thank you for choosing Abha. A member of our Senior Medical Board will reach out via your preferred channel shortly.
                              </p>
                              <button onClick={() => setRegistryStatus('idle')} className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.5em] border-b border-[#C5A059] pb-2">New Registry Request</button>
                           </motion.div>
                        ) : (
                           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <div className="mb-16">
                                 <h4 className="text-[12px] uppercase tracking-[0.8em] font-bold text-[#C5A059] mb-4">Board Submission</h4>
                                 <p className="text-[10px] text-gray-300 uppercase tracking-widest">Confidential Admission Portal</p>
                              </div>

                              <form onSubmit={handleRegistrySubmit} className="space-y-12">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="relative">
                                       <label className="text-[9px] uppercase tracking-[0.4em] text-gray-300 mb-2 block">Legal Name</label>
                                       <input required type="text" className="premium-input" placeholder="Full Identity" />
                                    </div>
                                    <div className="relative">
                                       <label className="text-[9px] uppercase tracking-[0.4em] text-gray-300 mb-2 block">Contact Point</label>
                                       <input required type="text" className="premium-input" placeholder="Email or Phone" />
                                    </div>
                                 </div>
                                 <div className="relative">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-gray-300 mb-2 block">Center of Interest</label>
                                    <select className="premium-input appearance-none bg-transparent">
                                       <option>Select Specialization</option>
                                       <option>Regenerative Aesthetics</option>
                                       <option>Biological Optimization</option>
                                       <option>Diagnostics & Screening</option>
                                    </select>
                                 </div>
                                 <div className="relative">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-gray-300 mb-2 block">Brief Inquiry (Optional)</label>
                                    <textarea className="premium-input min-h-[80px]" placeholder="Describe your medical aspirations..."></textarea>
                                 </div>
                                 <button type="submit" className="w-full py-8 bg-[#0A192F] text-[#E2D1B3] rounded-full uppercase tracking-[0.8em] font-bold text-[11px] hover:bg-[#C5A059] hover:text-white transition-all duration-700 shadow-2xl">
                                    Submit Application
                                 </button>
                              </form>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#FAF9F6] pt-60 pb-16 relative">
         <div className="container mx-auto px-10">
            <div className="grid lg:grid-cols-4 gap-20 mb-48">
               <div className="space-y-12">
                  <div className="flex flex-col">
                     <span className="text-5xl font-serif text-[#0A192F] tracking-tighter">ABHA</span>
                     <span className="text-[11px] tracking-[1.5em] font-bold text-[#C5A059] uppercase mt-4">The Atelier</span>
                  </div>
                  <p className="text-gray-400 text-xs font-light uppercase tracking-widest leading-loose">The absolute pinnacle of digital healthcare luxury in Dubai.</p>
               </div>
               <div>
                  <h4 className="text-[11px] uppercase tracking-[1em] font-bold text-[#C5A059] mb-12">Centers</h4>
                  <ul className="space-y-6 text-[11px] uppercase tracking-[0.5em] text-gray-400 font-bold">
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Longevity Lab</li>
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Aesthetic Suite</li>
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Diagnostic Wing</li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-[11px] uppercase tracking-[1em] font-bold text-[#C5A059] mb-12">Inquiry</h4>
                  <ul className="space-y-6 text-[11px] uppercase tracking-[0.5em] text-gray-400 font-bold">
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Board Registry</li>
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Concierge Access</li>
                     <li className="hover:text-[#0A192F] transition-colors cursor-pointer">Confidential Line</li>
                  </ul>
               </div>
               <div className="space-y-12">
                  <h4 className="text-[11px] uppercase tracking-[1em] font-bold text-[#C5A059] mb-12">Social</h4>
                  <div className="flex gap-8">
                     <Instagram className="text-gray-300 hover:text-[#E4405F] cursor-pointer transition-colors" size={24} />
                     <Linkedin className="text-gray-300 hover:text-[#0077B5] cursor-pointer transition-colors" size={24} />
                     <Facebook className="text-gray-300 hover:text-[#1877F2] cursor-pointer transition-colors" size={24} />
                  </div>
               </div>
            </div>
            <div className="pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] uppercase tracking-[0.6em] text-gray-300 font-bold">
               <p>© 2024 Abha Medical Group • Global Standards • Dubai, UAE</p>
               <div className="flex gap-12">
                  <a href="#" className="hover:text-[#0A192F]">Privacy Policy</a>
                  <a href="#" className="hover:text-[#0A192F]">Governance</a>
               </div>
            </div>
         </div>
         <div className="absolute bottom-0 right-0 p-20 opacity-[0.01] text-[30vw] font-serif select-none pointer-events-none">ABHA</div>
      </footer>

      {/* --- Floating Utilities --- */}
      
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${CLINIC_INFO.phone.replace(/\D/g,'')}`} 
        target="_blank" rel="noreferrer"
        className="fixed bottom-12 left-12 z-[90] bg-white p-4 rounded-full shadow-2xl flex items-center gap-6 group hover:bg-[#25D366] transition-all duration-700"
      >
        <div className="p-4 bg-[#25D366] rounded-full text-white shadow-xl shadow-[#25D366]/30 group-hover:scale-110 transition-transform duration-700"><MessageCircle size={32}/></div>
        <div className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-1000">
           <span className="text-[11px] font-bold uppercase tracking-[0.6em] pr-10 group-hover:text-white">The Concierge Desk</span>
        </div>
      </a>

      {/* Assistant */}
      <div className="fixed bottom-12 right-12 z-[90]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 w-96 md:w-[450px] bg-white shadow-[2px_2px_2px_gray] border border-[#C5A059]/20 rounded-[40px] overflow-hidden"
            >
               <div className="bg-[#0A192F] p-12 text-white flex justify-between items-center relative overflow-hidden">
                  <div className="flex items-center gap-10 relative z-10">
                     <div className="w-16 h-16 border border-[#C5A059] rounded-full flex items-center justify-center italic font-serif text-[#C5A059] text-2xl">A</div>
                     <div>
                        <h6 className="text-[11px] font-bold uppercase tracking-[0.4em] mb-2">The Assistant</h6>
                        <p className="text-[9px] text-[#C5A059] uppercase tracking-[1em] opacity-80 animate-pulse">Registry Open</p>
                     </div>
                  </div>
                  <button onClick={() => setIsChatOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity"><X size={28}/></button>
               </div>
               <div className="p-12 h-[400px] bg-[#FAF9F6] overflow-y-auto space-y-10 text-sm font-light leading-[2.5] italic text-gray-500 text-center">
                  "Welcome to the Abha private circle. I am here to facilitate your registry process and guide you through our centers of excellence. How may I assist your health journey today?"
               </div>
               <div className="p-8 bg-white border-t border-gray-50 flex gap-6">
                  <input className="flex-1 text-[11px] font-light uppercase tracking-[0.5em] focus:outline-none placeholder:text-gray-200" placeholder="Type your inquiry..." />
                  <button className="text-[#C5A059]"><Send size={24}/></button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#0A192F] text-[#C5A059] px-12 py-8 rounded-full flex items-center gap-10 shadow-2xl transition-all hover:bg-[#C5A059] hover:text-white"
        >
          <div className="text-right">
             <p className="text-[11px] font-bold uppercase tracking-[0.8em]">{isChatOpen ? 'Close' : 'Registry Assistant'}</p>
          </div>
          <Fingerprint size={32}/>
        </button>
      </div>

    </div>
  );
}