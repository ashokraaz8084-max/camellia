import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Star,
  ChevronDown,
  Instagram,
  Facebook,
  Mail,
  ArrowRight,
  MapPin,
  Clock,
  MessageCircle,
  Phone,
  Send
} from 'lucide-react';

// --- Constants & Data ---
const CONTACT_NUMBER = "+971502337497";
const LOGO_URL = "https://image2url.com/r2/default/images/1773727635763-d625528c-9a89-4443-87e5-937225cb123a.jpeg";

const SERVICES = [
  { id: "01", name: "Hair Styling", nameAr: "تصفيف الشعر", desc: "Bespoke structural styling tailored to your unique facial architecture.", price: "From AED 450", image: "https://image2url.com/r2/default/images/1773728259089-6b1afa83-128c-4ded-8b81-09a66ec53f98.jpg" },
  { id: "02", name: "Hair Coloring", nameAr: "تلوين الشعر", desc: "Master-level balayage using organic molecular pigments from France.", price: "From AED 800", image: "https://image2url.com/r2/default/images/1773727452121-f4c3469f-6d48-4adc-ba8f-2236de9b3516.jpg" },
  { id: "03", name: "Facial & Skin Care", nameAr: "العناية بالبشرة", desc: "Cellular rejuvenation using rare botanical extracts and gold-infused serums.", price: "From AED 600", image: "https://image2url.com/r2/default/images/1773728634989-382a0874-bca9-4722-9b11-43e6a6862f13.jpg" },
  { id: "04", name: "Nail Art", nameAr: "فن الأظافر", desc: "High-fashion nail architecture for the most discerning aesthetic.", price: "From AED 250", image: "https://image2url.com/r2/default/images/1773728823696-e72b7099-911f-4867-88f9-1b89869da9cc.jpg" },
  { id: "05", name: "Makeup", nameAr: "مكياج", desc: "Flawless, luminous artistry designed to enhance your natural topography.", price: "From AED 500", image: "https://image2url.com/r2/default/images/1773727560441-df8d7db8-6124-4bd3-b64b-247da9741778.jpg" },
  { id: "06", name: "Bridal Makeup", nameAr: "مكياج العروس", desc: "A transcendent bridal transformation for your most monumental occasion.", price: "From AED 2500", image: "https://image2url.com/r2/default/images/1773729046949-df05829e-dde5-4337-82b4-e60039238d2c.jpg" },
  { id: "07", name: "Spa & Massage", nameAr: "سبا ومساج", desc: "Holistic sensory therapies combining ancient rituals with modern restorative science.", price: "From AED 700", image: "https://image2url.com/r2/default/images/1773729490614-387b8dd3-3634-432b-8043-c02571da92d9.jpg" }
];

const REVIEWS = [
  { name: "Sarah Al-Maktoum", text: "The most private and sophisticated salon experience in Dubai. The attention to detail is unmatched.", rating: 5 },
  { name: "Elena Rodriguez", text: "HMK is not just a salon, it's an art atelier. My hair has never looked this vibrant and healthy.", rating: 5 },
  { name: "Amira Al-Fayed", text: "An absolute revelation. The bespoke treatments and serene atmosphere make it my ultimate escape in the city.", rating: 5 }
];

const GALLERY = [
  "https://image2url.com/r2/default/images/1773728259089-6b1afa83-128c-4ded-8b81-09a66ec53f98.jpg",
  "https://image2url.com/r2/default/images/1773727452121-f4c3469f-6d48-4adc-ba8f-2236de9b3516.jpg",
  "https://image2url.com/r2/default/images/1773728634989-382a0874-bca9-4722-9b11-43e6a6862f13.jpg",
  "https://image2url.com/r2/default/images/1773728823696-e72b7099-911f-4867-88f9-1b89869da9cc.jpg",
  "https://image2url.com/r2/default/images/1773727560441-df8d7db8-6124-4bd3-b64b-247da9741778.jpg",
  "https://image2url.com/r2/default/images/1773729046949-df05829e-dde5-4337-82b4-e60039238d2c.jpg"
];

const SectionHeader = ({ subtitle, title, titleAr, center = false }) => (
  <div className={`mb-16 flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'}`}>
    <span className="text-[#c5a059] text-xs tracking-[0.3em] uppercase font-bold mb-4">{subtitle}</span>
    <h2 className="text-4xl md:text-6xl font-cinzel leading-tight uppercase font-medium text-white">{title}</h2>
    {titleAr && <h2 className="text-2xl md:text-4xl font-arabic text-[#c5a059]/40 dir-rtl mt-2">{titleAr}</h2>}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const message = `✨ HMK PRIVATE INVITATION ✨\n\nName: ${data.name}\nPhone: ${data.phone}\nService: ${selectedService}\nDate: ${data.date}\n\nClient has requested a private session.`;
    window.open(`https://wa.me/${CONTACT_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitting(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-[#e5e5e5] min-h-screen font-sans selection:bg-[#c5a059] selection:text-black">
      {/* Luxury Global Frame */}
      <div className="fixed inset-4 border border-[#c5a059]/10 pointer-events-none z-[100] hidden md:block" />
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#c5a059] z-[110] origin-left" style={{ scaleX }} />

      {/* --- Sticky WhatsApp --- */}
      <a 
        href={`https://wa.me/${CONTACT_NUMBER.replace(/\D/g, '')}`} 
        target="_blank" 
        className="fixed bottom-8 right-8 z-[99] bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-[10px] font-black tracking-widest uppercase pl-2">Private Line</span>
        <MessageCircle size={24} />
      </a>

      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-[80] transition-all duration-700 ${scrolled ? 'bg-black/90 py-4 border-b border-white/5 backdrop-blur-xl' : 'bg-transparent py-10'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => scrollToSection('home')}>
             <img src={LOGO_URL} alt="Logo" className="h-12 w-auto grayscale brightness-200 group-hover:scale-105 transition-transform duration-700" />
             <div className="flex flex-col">
                <span className="font-cinzel text-xl text-white tracking-[0.4em] font-bold leading-none">HMK</span>
                <span className="text-[6px] text-[#c5a059] tracking-[0.8em] uppercase font-black mt-1">Maison Beauté</span>
             </div>
          </div>
          <div className="hidden lg:flex space-x-12 items-center text-[9px] tracking-[0.4em] uppercase font-black">
            {['Home', 'About', 'Services', 'Gallery', 'Reviews'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-white/40 hover:text-[#c5a059] transition-all duration-300 relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c5a059] group-hover:w-full transition-all duration-500"></span>
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="px-10 py-4 bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(197,160,89,0.1)]">Book Now</button>
          </div>
        </div>
      </nav>

      {/* --- CINEMATIC ULTRA-LUXURY HERO --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background Particles Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
           <div className="absolute top-0 left-0 w-full h-full animate-pulse-slow bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        {/* Dynamic Background Image */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          <motion.img 
            style={{ x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]), y: useTransform(mouseY, [-0.5, 0.5], [-20, 20]) }}
            src="https://image2url.com/r2/default/images/1773727398499-c4b8907a-9bc8-4b72-8410-acb05eebc973.jpg" 
            className="w-full h-full object-cover grayscale brightness-[0.35] scale-[1.05]" 
            alt="HMK Luxury"
          />
        </motion.div>

        {/* Hero Content Atelier */}
        <motion.div 
          style={{ 
            opacity: heroOpacity,
            x: useTransform(mouseX, [-0.5, 0.5], [15, -15]),
            y: useTransform(mouseY, [-0.5, 0.5], [15, -15])
          }}
          className="relative z-20 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-10"
          >
            <span className="text-[#c5a059] uppercase font-black text-[9px] tracking-[1.2em] block mb-2">Since 2012</span>
            <div className="w-12 h-[1px] bg-[#c5a059]/40 mx-auto" />
          </motion.div>

          <div className="relative mb-12">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.5 }}
            >
                <h1 className="text-[18vw] md:text-[11rem] font-cinzel text-white leading-none tracking-[-0.05em] uppercase font-bold relative inline-block">
                  HMK
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-4 -right-12 text-[10px] tracking-[0.5em] text-[#c5a059] hidden md:block"
                  >
                    ATELIER
                  </motion.span>
                </h1>
                <h2 className="text-4xl md:text-7xl font-cinzel text-[#c5a059] italic font-light tracking-[0.2em] -mt-4 md:-mt-8 opacity-90 drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">Maison</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="flex flex-col items-center"
          >
            <p className="text-white/40 font-serif italic text-lg md:text-2xl max-w-xl leading-relaxed mb-16 tracking-wide">
              Crafting timeless elegance for Dubai's most distinguished elite.
            </p>

            {/* ULTRA LUXURY BUTTONS SECTION */}
            <div className="flex flex-col sm:flex-row items-center gap-12">
              {/* ULTRA PREMIUM BOOK NOW BUTTON */}
              <button 
                onClick={() => scrollToSection('contact')} 
                className="group relative px-24 py-7 overflow-hidden rounded-sm transition-all duration-500 shadow-[0_0_50px_rgba(197,160,89,0.15)] hover:shadow-[0_0_80px_rgba(197,160,89,0.4)]"
              >
                {/* Gold Gradient Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059] via-[#f7e4b2] to-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-[#c5a059]/30" />
                
                {/* Moving Shine Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <span className="relative z-10 text-[#c5a059] group-hover:text-black font-cinzel text-[11px] tracking-[0.8em] font-bold uppercase transition-all duration-500 group-hover:scale-110 flex items-center gap-2">
                  Book Now
                </span>
                
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c5a059]/60 group-hover:border-black/40 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c5a059]/60 group-hover:border-black/40 transition-colors" />
              </button>
              
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-[#c5a059] font-cinzel text-[10px] tracking-[0.6em] font-bold uppercase hover:text-white transition-all flex items-center gap-4 group relative"
              >
                Our Legacy 
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a059] group-hover:w-full transition-all duration-500"></span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Vertical Coordinates - Luxury Detail */}
        <div className="absolute left-10 bottom-10 z-20 hidden lg:block">
           <span className="text-white/20 text-[8px] tracking-[0.5em] font-bold vertical-text uppercase">25.2329° N, 55.2425° E</span>
        </div>

        {/* Luxury Scroll Guide */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <span className="text-white/30 text-[8px] tracking-[1em] uppercase font-black">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#c5a059] to-transparent" />
        </motion.div>
      </section>

      {/* --- About --- */}
      <section id="about" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeader subtitle="The Heritage" title="Defining Elegance" titleAr="تعريف الأناقة" />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">HMK Maison Beauté is not just a salon; it's a private estate where beauty meets artistry. We cater to the most discerning individuals in Dubai, offering bespoke treatments that reflect your inner radiance.</p>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-2 border-[#c5a059] pl-6 py-2">
                <h4 className="text-white font-bold text-2xl">Elite</h4>
                <p className="text-xs text-[#c5a059] uppercase tracking-widest mt-1">Specialists</p>
              </div>
              <div className="border-l-2 border-[#c5a059] pl-6 py-2">
                <h4 className="text-white font-bold text-2xl">Private</h4>
                <p className="text-xs text-[#c5a059] uppercase tracking-widest mt-1">Consultations</p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px]">
            <img src="https://image2url.com/r2/default/images/1773727492049-1e496e62-11db-4cc5-bb19-8810c8b01dc7.jpg" className="w-full h-full object-cover grayscale brightness-75 rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-48 px-8 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-24 flex flex-col items-center text-center">
             <span className="text-[#c5a059] text-[10px] tracking-[1.5em] uppercase font-bold mb-6">The Atelier</span>
             <h2 className="text-5xl md:text-7xl font-cinzel text-white uppercase tracking-tight">Curated <br/> Rituals</h2>
             <h2 className="text-2xl md:text-4xl font-arabic text-[#c5a059]/30 mt-4">طقوس مختارة</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {SERVICES.map((s, idx) => (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: idx * 0.1 }} 
                className="group relative h-[600px] bg-[#0a0a0a] overflow-hidden border border-white/5"
              >
                <div className="absolute inset-0">
                  <motion.img 
                    src={s.image} 
                    className="w-full h-full object-cover grayscale-[0.8] brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-110 transition-all duration-[1.5s]" 
                    alt={s.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
                  <div className="flex justify-between items-start">
                    <span className="font-cinzel text-[10px] tracking-[0.5em] text-[#c5a059] font-black uppercase">{s.id}</span>
                    <div className="bg-[#c5a059] text-black px-4 py-1.5 rounded-full text-[8px] font-black tracking-widest uppercase">
                      {s.price}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-cinzel text-white uppercase tracking-tight">{s.name}</h3>
                    <p className="text-[#c5a059]/60 font-arabic text-lg dir-rtl">{s.nameAr}</p>
                    <div className="h-[1px] w-12 bg-[#c5a059]/40 group-hover:w-full transition-all duration-700" />
                    <p className="text-gray-400 font-serif text-sm italic leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                       {s.desc}
                    </p>
                    <button onClick={() => scrollToSection('contact')} className="flex items-center gap-2 text-white text-[8px] tracking-[0.4em] font-black uppercase opacity-0 group-hover:opacity-100 transition-all duration-500">
                      Reserve Session <ArrowRight size={12} className="text-[#c5a059]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Gallery --- */}
      <section id="gallery" className="py-32 px-6 bg-[#0a0a0a]">
        <SectionHeader subtitle="Masterpieces" title="Visual Gallery" titleAr="معرض الصور" center />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {GALLERY.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 0.98 }} className="relative group overflow-hidden h-80 rounded-xl">
              <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Reviews --- */}
      <section id="reviews" className="py-32 bg-black px-6">
        <SectionHeader subtitle="Kind Words" title="Guest Experiences" titleAr="تجارب الضيوف" center />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-12">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-[#0a0a0a] p-10 rounded-2xl border border-white/5">
              <div className="flex gap-1 text-[#c5a059] mb-6">
                {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-400 italic mb-8 leading-relaxed">"{r.text}"</p>
              <h4 className="text-white font-bold tracking-widest uppercase text-sm">— {r.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* --- RESERVATION SECTION --- */}
      <section id="contact" className="py-48 px-8 bg-[#050505] relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
             <span className="text-[#c5a059] text-[10px] tracking-[1em] uppercase font-black block">Private Invitation</span>
             <h2 className="text-5xl md:text-7xl font-cinzel text-white uppercase leading-none">Request <br/> <span className="text-[#c5a059]">A Session</span></h2>
             <p className="text-gray-500 font-serif text-xl italic max-w-xl mx-auto">Experience the pinnacle of bespoke beauty in our Jumeirah sanctuary.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[40px]"
          >
            <form onSubmit={handleBookingSubmit} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="relative group">
                  <label className="absolute -top-6 left-0 text-[9px] tracking-[0.3em] font-bold text-[#c5a059] uppercase opacity-60">Identity / Name</label>
                  <input required name="name" className="w-full bg-transparent border-b border-white/20 py-4 text-white font-cinzel tracking-widest focus:outline-none focus:border-[#c5a059] transition-all" placeholder="ENTER YOUR NAME" />
                </div>
                <div className="relative group">
                  <label className="absolute -top-6 left-0 text-[9px] tracking-[0.3em] font-bold text-[#c5a059] uppercase opacity-60">Mobile Contact</label>
                  <input required name="phone" className="w-full bg-transparent border-b border-white/20 py-4 text-white font-cinzel tracking-widest focus:outline-none focus:border-[#c5a059] transition-all" placeholder="+971 -- --- ----" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 pt-4">
                <div className="relative group">
                  <label className="absolute -top-6 left-0 text-[9px] tracking-[0.3em] font-bold text-[#c5a059] uppercase opacity-60">Bespoke Ritual</label>
                  <select 
                    required 
                    onChange={(e) => setSelectedService(e.target.value)} 
                    className="w-full bg-transparent border-b border-white/20 py-6 px-4 text-white font-cinzel tracking-widest focus:outline-none focus:border-[#c5a059] appearance-none"
                  >
                    <option value="" className="bg-[#050505]">SELECT SERVICE</option>
                    {SERVICES.map(s => <option key={s.id} value={s.name} className="bg-[#050505]">{s.name.toUpperCase()}</option>)}
                  </select>
                  <ChevronDown className="absolute right-0 bottom-7 text-white/20" size={16} />
                </div>
                
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting} 
                className="w-full relative group overflow-hidden bg-[#c5a059] text-black py-8 rounded-2xl shadow-xl shadow-[#c5a059]/10"
              >
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[1em] pl-4">Confirm Booking</span>
              </motion.button>
            </form>
          </motion.div>

          <div className="mt-20 flex flex-wrap justify-center gap-16">
             <div className="flex items-center gap-4">
               <MapPin size={16} className="text-[#c5a059]" />
               <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold">Jumeirah 1, Dubai</span>
             </div>
             <div className="flex items-center gap-4">
               <Phone size={16} className="text-[#c5a059]" />
               <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold">{CONTACT_NUMBER}</span>
             </div>
             <div className="flex items-center gap-4">
               <Clock size={16} className="text-[#c5a059]" />
               <span className="text-[10px] tracking-widest text-gray-400 uppercase font-bold">10:00 — 22:00 Daily</span>
             </div>
          </div>
        </div>
      </section>

      {/* --- GOOGLE MAP SECTION --- */}
      <section className="py-24 px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="w-full h-[500px] rounded-[40px] overflow-hidden border border-[#c5a059]/20"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14436.46746404396!2d55.24250289196924!3d25.2329381666542173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4305c4530069%3A0xc0f1b29a29d4793d!2sJumeirah%201%20-%20Dubai!5e0!3m2!1sen!2sae!4v1715432000000!5m2!1sen!2sae" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen="" 
              loading="lazy" 
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* --- ULTRA WOW LUXURY FOOTER --- */}
      <footer className="relative bg-[#050505] overflow-hidden pt-40 pb-16">
        {/* Abstract Background Design Elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 blur-[120px] rounded-full -translate-y-1/2" />
        
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-8 items-start mb-32">
            
            {/* Brand Essence Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center lg:items-start group cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <div className="relative mb-6">
                  <img src={LOGO_URL} alt="Logo" className="h-28 w-auto grayscale brightness-200" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
                <div className="text-center lg:text-left">
                  <h4 className="font-cinzel text-3xl text-white tracking-[0.5em] font-bold leading-none">HMK</h4>
                  <span className="text-[8px] text-[#c5a059] tracking-[1.2em] uppercase font-black block mt-3">Maison De Beauté</span>
                </div>
              </motion.div>
              
              <p className="text-white/30 text-xs font-serif italic leading-relaxed tracking-widest max-w-sm text-center lg:text-left">
                Where high-fashion architecture meets biological precision. A sanctuary for Dubai's most distinguished elite since 2012.
              </p>

              {/* Newsletter Elite - WOW Feature */}
              <div className="w-full max-w-sm mt-4">
                <span className="text-[#c5a059] text-[9px] tracking-[0.4em] uppercase font-bold block mb-4">Join The Elite Circle</span>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="E-MAIL ADDRESS" 
                    className="w-full bg-transparent border border-white/10 rounded-full py-4 px-8 text-[10px] tracking-[0.3em] text-white focus:outline-none focus:border-[#c5a059] transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#c5a059] text-black p-2 rounded-full hover:scale-110 transition-transform">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-12 w-full">
              <div className="flex flex-col space-y-8">
                <h5 className="text-white text-[10px] tracking-[0.4em] uppercase font-black border-b border-[#c5a059]/20 pb-4 inline-block">Maison</h5>
                <ul className="space-y-4">
                  {['Home', 'Heritage', 'Atelier', 'Artisans'].map(item => (
                    <li key={item}>
                      <button onClick={() => scrollToSection(item.toLowerCase())} className="text-white/40 hover:text-[#c5a059] text-[9px] tracking-[0.3em] uppercase transition-all hover:translate-x-2 block">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-8">
                <h5 className="text-white text-[10px] tracking-[0.4em] uppercase font-black border-b border-[#c5a059]/20 pb-4 inline-block">Services</h5>
                <ul className="space-y-4">
                  {['Styling', 'Coloring', 'Rituals', 'Skin'].map(item => (
                    <li key={item}>
                      <button onClick={() => scrollToSection('services')} className="text-white/40 hover:text-[#c5a059] text-[9px] tracking-[0.3em] uppercase transition-all hover:translate-x-2 block">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-8 hidden sm:flex">
                <h5 className="text-white text-[10px] tracking-[0.4em] uppercase font-black border-b border-[#c5a059]/20 pb-4 inline-block">Concierge</h5>
                <ul className="space-y-4">
                  {['Private', 'Bridal', 'Bespoke', 'Events'].map(item => (
                    <li key={item}>
                      <button className="text-white/40 hover:text-[#c5a059] text-[9px] tracking-[0.3em] uppercase transition-all hover:translate-x-2 block">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact & Social Column */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-12 w-full">
              <div className="text-center lg:text-right space-y-4">
                <span className="text-[#c5a059] text-[10px] tracking-[0.5em] uppercase font-black block">The Address</span>
                <p className="text-white text-xs tracking-[0.2em] font-serif italic">Villa 12, Jumeirah 1<br/>Dubai, United Arab Emirates</p>
                <p className="text-[#c5a059] text-[11px] tracking-widest font-bold mt-4">{CONTACT_NUMBER}</p>
              </div>

              <div className="flex space-x-8">
                {[Instagram, Facebook, Mail].map((Icon, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    whileHover={{ scale: 1.2 }}
                    className="relative p-4 rounded-full border border-white/5 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#c5a059] opacity-0 group-hover:opacity-10 transition-opacity" />
                    <Icon size={18} className="text-white/40 group-hover:text-[#c5a059] transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar - Cinematic Finish */}
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-[8px] text-white/20 tracking-[0.8em] uppercase">&copy; 2024 HMK Private Collection</span>
              <div className="hidden md:block w-8 h-[1px] bg-white/10" />
              <button className="text-[8px] text-white/20 tracking-[0.6em] uppercase hover:text-[#c5a059] transition-colors">Legal Mentions</button>
              <button className="text-[8px] text-white/20 tracking-[0.6em] uppercase hover:text-[#c5a059] transition-colors">Privacy Charter</button>
            </div>
            
            <div className="flex items-center gap-4 group cursor-default">
              <span className="text-[8px] text-white/40 tracking-[1.5em] uppercase font-bold group-hover:text-[#c5a059] transition-colors">Designed For The 1%</span>
              <div className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Amiri:wght@400;700&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-arabic { font-family: 'Amiri', serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }
        .vertical-text { writing-mode: vertical-rl; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(0.7) sepia(1) saturate(5) hue-rotate(30deg);
        }
        /* Reveal-up footer feel */
        footer {
          box-shadow: 0 -50px 100px -20px rgba(0,0,0,0.5);
        }
      `}} />
    </div>
  );
}