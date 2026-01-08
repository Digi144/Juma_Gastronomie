import { useState, useEffect } from 'react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    "/images/02.jpg",
    "/images/02.webp",
    "/images/03.webp",
    "/images/05.webp",
    "/images/202511359.webp"
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slideshow Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Ambiente', href: '#ambiente' },
    { name: 'Lösungen', href: '#loesungen' },
    { name: 'Leistungen', href: '#leistungen' },
    { name: 'Referenzen', href: '#referenzen' },
    { name: 'Über Juma', href: '#ueber-juma' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0] text-[#003324] font-manrope selection:bg-[#FFDD80] selection:text-[#003324] overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FFFFF0]/90 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Monogram & Text Logo */}
          <div className="flex items-center space-x-4 md:space-x-6 relative z-[60]">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-2 md:p-3 shadow-xl flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
               <img src="/assets/brand/Monogram.webp" alt="JUMA Monogram" className="w-full h-full object-contain" />
            </div>
            <div className="h-8 md:h-10">
              <img src="/assets/brand/Wordmark.webp" alt="JUMA" className="h-full object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(34%) saturate(1204%) hue-rotate(116deg) brightness(95%) contrast(101%)' }} />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-8 text-[10px] tracking-[0.2em] uppercase font-bold opacity-80 text-[#003324]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#A87B00] transition-colors">{link.name}</a>
            ))}
            <a href="#kontakt" className="bg-[#A87B00] text-white px-6 py-2 rounded-full hover:bg-[#003324] transition-all shadow-md">Kontakt</a>
          </nav>

          {/* Animated Burger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="xl:hidden relative z-[60] w-10 h-10 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`w-8 h-0.5 bg-[#003324] transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-[#003324] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-8 h-0.5 bg-[#003324] transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#FFFFF0] z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-20px]'}`}>
          <nav className="flex flex-col items-center space-y-8 text-lg md:text-2xl tracking-[0.2em] uppercase font-bold text-[#003324]">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={toggleMobileMenu}
                className="hover:text-[#A87B00] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#kontakt" 
              onClick={toggleMobileMenu}
              className="bg-[#A87B00] text-white px-10 py-4 rounded-full shadow-xl"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section with Slideshow */}
      <section className="relative h-[85vh] flex items-center justify-center p-4 md:p-6 lg:p-10 mt-20 md:mt-24">
        <div className="relative w-full h-full rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,51,36,0.15)] border border-white/40">
          
          {/* Slideshow Images */}
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={slide} 
                alt={`JUMA Slide ${index + 1}`} 
                className="w-full h-full object-cover brightness-[0.95] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
            </div>
          ))}

          {/* Premium Glassmorphism Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-500 shadow-2xl group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:-translate-x-1"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-500 shadow-2xl group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Premium Dark Glassmorphism CTA - Centered on top of the hero image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center">
            <a 
              href="#kontakt" 
              className="bg-[#003324]/20 backdrop-blur-2xl border border-white/20 px-10 md:px-14 py-4 md:py-5 rounded-full flex items-center space-x-4 md:space-x-6 hover:bg-[#003324]/40 hover:scale-105 transition-all duration-500 shadow-[0_25px_50px_rgba(0,0,0,0.5)] group/cta scale-90 md:scale-100"
            >
              <span className="text-xs md:text-sm lg:text-base font-antonio tracking-[0.3em] uppercase font-bold text-white group-hover/cta:text-[#FFDD80] transition-colors">
                Anfrage starten
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover/cta:bg-[#A87B00] group-hover/cta:border-[#A87B00] transition-all duration-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white transition-transform group-hover/cta:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. AMBIENTE */}
      <section id="ambiente" className="py-24 md:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 animate-slide-up">
              <div className="inline-block bg-[#FFDD80]/20 px-6 py-2 rounded-full border border-[#FFDD80]/40 text-[#A87B00] text-[10px] tracking-[0.3em] uppercase font-bold">
                Das Ambiente
              </div>
              <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-[#003324]">
                Exklusive Lichtkonzepte <br />
                <span className="text-[#A87B00] italic">für die Hotellerie.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#003324]/80 leading-relaxed font-light">
                Seit 1967 realisieren wir als Wiener Traditionsmanufaktur einzigartige Beleuchtungslösungen, die Ihr Hotel oder Restaurant perfekt ergänzen. Von der ersten Skizze bis zur finalen Montage.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
                <a href="#kontakt" className="bg-[#003324] text-white px-10 py-4 rounded-full font-antonio uppercase tracking-widest hover:bg-[#A87B00] transition-all shadow-xl w-full sm:w-auto text-center">
                  Projektanfrage starten
                </a>
                <a href="#loesungen" className="text-[#003324] font-bold tracking-widest uppercase text-xs flex items-center space-x-4 group">
                  <span>Unsere Lösungen entdecken</span>
                  <div className="w-8 h-8 rounded-full border border-[#003324]/20 flex items-center justify-center group-hover:bg-[#A87B00] group-hover:text-white transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
              <img 
                src="/images/AdobeStock_76716834.webp" 
                alt="Elegantes Hotel Ambiente" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#003324]/5 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LÖSUNGEN */}
      <section id="loesungen" className="py-24 md:py-40 bg-[#F5F2ED]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto text-center mb-24 md:mb-32">
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-8xl tracking-tighter mb-10 text-[#003324]">
              JUMA: Wo Ihr Ambiente <br />
              <span className="text-[#A87B00] italic">zum Erlebnis wird.</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#003324]/80 leading-relaxed font-light">
              Wir bei JUMA verstehen uns nicht nur als Hersteller, sondern als Partner für Hoteliers und Gastronomen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { title: "Maximale Individualität", text: "Jede Leuchte ein Unikat, gefertigt nach Ihren Entwürfen und Maßen." },
              { title: "Absolute Zuverlässigkeit", text: "Als Familienunternehmen in dritter Generation stehen wir für Termintreue." },
              { title: "Ganzheitlicher Service", text: "Von der Planung bis zur Montage – ein kompetenter Ansprechpartner." }
            ].map((v, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 sm:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl hover:translate-y-[-10px] transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#A87B00] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-8 shadow-lg">0{i+1}</div>
                <h3 className="text-xl sm:text-2xl font-antonio uppercase tracking-wider mb-4 sm:mb-6 text-[#003324]">{v.title}</h3>
                <p className="text-sm sm:text-base text-[#003324]/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEISTUNGEN */}
      <section id="leistungen" className="py-24 md:py-40 bg-[#003324] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 md:mb-32 gap-10">
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-8xl tracking-tighter leading-none">
              Ihr Partner für <br />
              <span className="text-[#FFDD80] italic">exzellente Gastlichkeit.</span>
            </h2>
            <p className="max-w-md text-white/60 text-base sm:text-lg font-light border-l border-[#FFDD80]/40 pl-8">
              Wir unterstützen Sie in jeder Phase Ihres Projekts mit höchster Präzision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Technische Beratung", text: "Lichtberechnungen und Materialmuster für die perfekte Integration." },
              { title: "Design & Sonderbau", text: "Adaption klassischer Designs oder komplette Neuentwicklungen." },
              { title: "Projektmanagement", text: "Weltweite Koordination, Lieferung und fachgerechte Montage." },
              { title: "Restauration", text: "Denkmalgerechte Instandsetzung oder LED-Modernisierung." }
            ].map((l, i) => (
              <div key={i} className="group border border-white/10 p-8 md:p-10 hover:bg-white/5 transition-all duration-500 rounded-[2.5rem] flex flex-col h-full">
                <div className="h-1 w-0 bg-[#FFDD80] group-hover:w-full transition-all duration-700 mb-8 shrink-0"></div>
                <h4 className="text-base sm:text-lg md:text-xl font-antonio uppercase tracking-wider mb-6 group-hover:text-[#FFDD80] transition-colors leading-tight break-words min-h-[3rem] flex items-center">
                  {l.title}
                </h4>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light mt-auto">
                  {l.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REFERENZEN */}
      <section id="referenzen" className="py-24 md:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-24 md:mb-32">
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-8xl tracking-tighter text-[#003324]">
              Vertrauen, das wir uns <br />
              <span className="text-[#A87B00] italic">erarbeitet haben.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { name: "Ritz Carlton, Wien", desc: "Exklusive Kristallleuchten für zeitlose Eleganz.", img: "/images/AdobeStock_110382044.jpeg?v=1" },
              { name: "Palais Esterhazy, Wien", desc: "Historische Beleuchtung für prachtvolle Events.", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2068&auto=format&fit=crop" },
              { name: "The View Restaurant", desc: "Modernes Design trifft auf traditionelle Handwerkskunst.", img: "/images/20160412_135405.webp?v=1" }
            ].map((p, i) => (
              <div key={i} className="group relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden aspect-[3/4] shadow-2xl">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003324] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 p-8 sm:p-10 lg:p-12 flex flex-col justify-end text-white translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <h4 className="text-2xl sm:text-3xl font-antonio uppercase mb-4">{p.name}</h4>
                  <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ÜBER JUMA */}
      <section id="ueber-juma" className="py-24 md:py-40 bg-[#F5F2ED] overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <h2 className="font-poiret text-5xl sm:text-6xl md:text-[8rem] tracking-tighter leading-[0.85] text-[#003324]">
                Handwerk <br />
                aus Wien. <br />
                <span className="text-[#A87B00] italic">Seit 1967.</span>
              </h2>
              <p className="text-lg sm:text-xl text-[#003324]/80 leading-relaxed font-light max-w-lg">
                JUMA Leuchten ist ein Wiener Familienunternehmen, das die Kunst der Leuchtenherstellung seit drei Generationen pflegt.
              </p>
              <div className="pt-10 border-t border-[#003324]/10">
                <img src="/assets/brand/Combination mark.webp" alt="JUMA Combination Mark" className="h-16 sm:h-20 object-contain grayscale opacity-50" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
              <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl translate-y-8 sm:translate-y-12">
                <img src="/images/Mohammad Juma_optimized.webp" alt="Mohammad Juma" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/images/Altes Geschäft.webp" alt="Juma Historisches Geschäft" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. KONTAKT */}
      <section id="kontakt" className="py-24 md:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-6xl mx-auto bg-[#003324] rounded-[3rem] md:rounded-[6rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 sm:p-12 md:p-20 text-white flex flex-col justify-center">
              <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl tracking-tighter mb-8 text-white">
                Lassen Sie uns <br />
                <span className="text-[#FFDD80] italic">sprechen.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/60 font-light mb-12">
                Wir freuen uns darauf, Ihr Projekt zum Leuchten zu bringen.
              </p>
            </div>
            
            <div className="lg:w-1/2 bg-white/5 backdrop-blur-xl p-10 sm:p-12 md:p-20 border-l border-white/10">
              <form className="space-y-6 sm:space-y-8">
                <input type="text" placeholder="Firma" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FFDD80] text-white placeholder:text-white/30" />
                <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FFDD80] text-white placeholder:text-white/30" />
                <input type="email" placeholder="E-Mail" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#FFDD80] text-white placeholder:text-white/30" />
                <button className="w-full bg-[#A87B00] text-white py-5 sm:py-6 rounded-full font-antonio uppercase tracking-[0.3em] text-lg sm:text-xl hover:bg-white hover:text-[#003324] transition-all">
                  Anfrage senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-16 bg-[#FFFFF0] border-t border-[#003324]/5">
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold text-[#003324]">
          <div className="text-center md:text-left mb-8 md:mb-0">© 2026 JUMA Manufacturing Vienna. <br className="md:hidden" /> Handgefertigt seit 1967.</div>
          <div className="flex space-x-8 sm:space-x-12">
            <a href="#" className="hover:text-[#A87B00] transition-colors">Impressum</a>
            <a href="#" className="hover:text-[#A87B00] transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}

export default App;
