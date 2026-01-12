import { useState, useEffect } from 'react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const heroSlides = [
    "/images/02.jpg",
    "/images/02.webp",
    "/images/03.webp",
    "/images/05.webp",
    "/images/202511359.webp"
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          
          // Parallax-Effekt für Problem & Lösung Sektion - Bild bewegt sich mit Scrollen
          const problemSection = document.getElementById('loesungen');
          if (problemSection) {
            const rect = problemSection.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const sectionTop = problemSection.offsetTop;
            const sectionHeight = rect.height;
            
            // Berechne, wie weit die Sektion im Viewport ist
            const scrollStart = sectionTop - viewportHeight;
            const scrollEnd = sectionTop + sectionHeight;
            
            // Bild bewegt sich mit dem Scrollen - mehr Momentum für flüssigere Bewegung
            if (scrollPosition >= scrollStart && scrollPosition <= scrollEnd) {
              // Multipliziere mit höherem Wert für mehr Bewegung und flüssigeren Effekt
              const offset = (scrollPosition - sectionTop) * 0.7; // Erhöht von 0.5 auf 0.7
              setParallaxOffset(offset);
            } else if (scrollPosition < scrollStart) {
              setParallaxOffset(0);
            } else {
              setParallaxOffset((scrollEnd - sectionTop) * 0.7);
            }
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slideshow Timer - Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const navLinks = [
    { name: 'Ambiente', href: '#ambiente' },
    { name: 'Lösungen', href: '#loesungen' },
    { name: 'Leistungen', href: '#leistungen' },
    { name: 'Referenzen', href: '#referenzen' },
    { name: 'Über Juma', href: '#ueber-juma' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0] text-[#003324] font-manrope selection:bg-[#FFDD80] selection:text-[#003324] overflow-x-hidden">
      
      {/* 1. Header / Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FFFFF0]/90 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Monogram & Text Logo */}
          <div className="flex items-center space-x-4 md:space-x-6 relative z-[60]">
            <div className="flex items-center justify-center h-8 md:h-10">
               <img src="/assets/brand/Monogram.webp" alt="JUMA Monogram" className="h-full object-contain" />
            </div>
            <div className="h-8 md:h-10">
              <img src="/assets/brand/Wordmark.webp" alt="JUMA" className="h-full object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(34%) saturate(1204%) hue-rotate(116deg) brightness(95%) contrast(101%)' }} />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase font-light opacity-80 text-[#003324]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:font-bold hover:text-[#A87B00] transition-all duration-300 whitespace-nowrap">{link.name}</a>
            ))}
            <a href="#kontakt" className="bg-[#A87B00] text-white px-6 py-2 rounded-full font-bold hover:bg-[#003324] transition-all shadow-md ml-2">Kontakt</a>
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
          <nav className="flex flex-col items-center space-y-8 text-lg md:text-2xl tracking-[0.2em] uppercase font-light text-[#003324]">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={toggleMobileMenu}
                className="hover:font-bold hover:text-[#A87B00] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#kontakt" 
              onClick={toggleMobileMenu}
              className="bg-[#A87B00] text-white px-10 py-4 rounded-full font-bold shadow-xl"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section with Split Layout: Text Left, Slideshow Right */}
      <section className="relative min-h-[85vh] flex items-center p-4 md:p-6 lg:p-10 mt-20 md:mt-24">
        <div className="container mx-auto w-full">
          <div className="grid lg:grid-cols-[52%_48%] gap-8 lg:gap-12 items-center">
            
            {/* Left Side: Hero Text & CTA (52%) */}
            <div className="space-y-8 md:space-y-10 lg:pl-8 xl:pl-16">
              {/* H1 - Main Headline */}
              <h1 className="font-poiret text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.2] tracking-tight">
                <span className="text-[#003324]">Das perfekte Licht</span>
                <br />
                <span className="text-[#A87B00] text-5xl sm:text-6xl md:text-7xl lg:text-[72px]">für Ihr Ambiente.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#2C2C2C] leading-[1.7] font-light max-w-[500px]">
                Exklusive Lichtkonzepte, die Ihre Gäste verzaubern. Von der ersten Beratung bis zur finalen Montage – wir realisieren die Beleuchtung, die Ihr Hotel oder Restaurant einzigartig macht.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pt-4 md:pt-6">
                <a 
                  href="#kontakt" 
                  className="bg-[#003324] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#003324]/90 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
                >
                  PROJEKTANFRAGE STARTEN
                </a>
                <a 
                  href="#loesungen" 
                  className="border-2 border-[#003324] text-[#003324] px-8 md:px-10 py-3 md:py-4 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#003324]/10 transition-all duration-300 cursor-pointer"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>

            {/* Right Side: Vertical Slideshow (48%) */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] xl:h-[750px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
              {/* Slideshow Images */}
              {heroSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={slide} 
                    alt={`JUMA Slide ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Slider Indicators - Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#A87B00] w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JUMA Divider - Zwischen Hero und 2. Sektion */}
      <div className="py-12 md:py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-6">
          <img 
            src="/images/Juma_divider.webp" 
            alt="JUMA Divider" 
            className="w-full h-auto max-h-24 md:max-h-32 object-contain"
          />
        </div>
      </div>

      {/* 3. Unsere Lösungen für Ihre Gastlichkeit */}
      <section id="ambiente" className="py-24 md:py-32 lg:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto mb-16 md:mb-24">
            <div className="inline-block bg-[#FFDD80]/20 px-6 py-2 rounded-full border border-[#FFDD80]/40 text-[#A87B00] text-[10px] tracking-[0.3em] uppercase font-bold mb-8">
              Unsere Lösungen für Ihre Gastlichkeit
            </div>
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-[#003324] mb-10">
              Wo Ambiente <br />
              <span className="text-[#A87B00] italic">zum Erlebnis wird.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#003324]/80 leading-relaxed font-light max-w-3xl">
              Wir bei JUMA verstehen uns nicht nur als Hersteller, sondern als Partner für Hoteliers und Gastronomen. Jede Leuchte wird individuell für Ihr Projekt gefertigt – von der ersten Skizze bis zur finalen Montage.
            </p>
          </div>

          {/* Feature Cards with Icons */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-12 md:mb-16">
            {[
              { 
                number: "01",
                title: "Maximale Individualität", 
                text: "Jede Leuchte ein Unikat, gefertigt nach Ihren Entwürfen und Maßen. Keine Standardlösungen – nur maßgeschneiderte Perfektion.",
                icon: "✨"
              },
              { 
                number: "02",
                title: "Absolute Zuverlässigkeit", 
                text: "Als Familienunternehmen in dritter Generation stehen wir für Termintreue und höchste Qualität in jedem Projekt.",
                icon: "✓"
              },
              { 
                number: "03",
                title: "Ganzheitlicher Service", 
                text: "Von der Planung bis zur Montage – ein kompetenter Ansprechpartner für alle Phasen Ihres Projekts.",
                icon: "🤝"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 sm:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-xl hover:translate-y-[-10px] transition-all duration-500 flex flex-col items-center text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#003324] rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  {feature.number}
                </div>
                <h3 className="text-xl sm:text-2xl font-antonio uppercase tracking-wider mb-4 sm:mb-6 text-[#003324]">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#003324]/70 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="text-center">
            <a 
              href="#leistungen" 
              className="inline-flex items-center space-x-4 bg-[#003324] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#003324]/90 hover:scale-[1.02] transition-all duration-300 shadow-lg group"
            >
              <span>Unsere Leistungen entdecken</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 4. Problem & Lösung */}
      <section id="loesungen" className="relative py-24 md:py-40 text-white overflow-hidden">
        {/* Parallax Background Image - bewegt sich mit Scrollen */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform',
            transition: 'transform 0.05s ease-out'
          }}
        >
          <img 
            src="/images/AdobeStock_110382044.jpeg" 
            alt="Luxury Hotel Lighting" 
            className="w-full h-[150%] object-cover"
          />
        </div>
        
        {/* Darker Overlay for Text Readability */}
        <div className="absolute inset-0 bg-[#2C2C2C]/85 z-[1]"></div>
        
        {/* Content */}
        <div className="container mx-auto px-6 md:px-10 relative z-[2]">
          <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
            {/* Problem */}
            <div className="space-y-8">
              <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white">
                Standardlösungen werden <br />
                <span className="text-[#FFDD80] italic">Ihrem Projekt nicht gerecht.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Viele Hotels und Restaurants greifen auf Standardbeleuchtung zurück, die weder die Atmosphäre noch die Individualität des Raumes widerspiegelt. Das Ergebnis: Räume, die austauschbar wirken statt einzigartig.
              </p>
            </div>

            {/* Lösung */}
            <div className="space-y-8">
              <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white">
                Wo Ihre Vision <br />
                <span className="text-[#FFDD80] italic">zu Licht wird.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Bei JUMA realisieren wir maßgeschneiderte Lichtkonzepte, die perfekt auf Ihr Projekt abgestimmt sind. Jede Leuchte wird individuell gefertigt – von der ersten Beratung bis zur finalen Montage. So entstehen Räume, die Ihre Gäste verzaubern.
              </p>
              <div className="pt-6">
                <a 
                  href="#kontakt" 
                  className="inline-block bg-[#A87B00] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#FFDD80] hover:text-[#003324] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  Jetzt Projekt starten
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEISTUNGEN */}
      <section id="leistungen" className="py-24 md:py-40 bg-[#003324] text-white overflow-hidden relative">
        {/* Schräger Divider oben in Grün */}
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 z-0">
          <div 
            className="w-full h-full bg-[#003324]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)'
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 md:mb-32 gap-10">
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-8xl tracking-tighter leading-none text-left">
              Ihr Partner für <br />
              <span className="text-[#FFDD80] italic">exzellente Gastlichkeit.</span>
            </h2>
            <p className="max-w-md text-white/60 text-base sm:text-lg font-light border-l border-[#FFDD80]/40 pl-8">
              Wir unterstützen Sie in jeder Phase Ihres Projekts mit höchster Präzision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                title: "Technische Beratung", 
                text: "Lichtberechnungen und Materialmuster für die perfekte Integration.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="10"></line>
                    <line x1="18" y1="20" x2="18" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="16"></line>
                  </svg>
                )
              },
              { 
                title: "Design & Sonderbau", 
                text: "Adaption klassischer Designs oder komplette Neuentwicklungen.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                )
              },
              { 
                title: "Projektmanagement", 
                text: "Weltweite Koordination, Lieferung und fachgerechte Montage.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="6" x2="12" y2="12"></line>
                    <line x1="16" y1="10" x2="12" y2="12"></line>
                  </svg>
                )
              },
              { 
                title: "Restauration", 
                text: "Denkmalgerechte Instandsetzung oder LED-Modernisierung.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                )
              }
            ].map((l, i) => (
              <div key={i} className="group border border-white/10 p-8 md:p-10 hover:bg-white/5 transition-all duration-500 rounded-[2.5rem] flex flex-col h-full">
                <div className="h-1 w-0 bg-[#FFDD80] group-hover:w-16 transition-all duration-700 mb-8 shrink-0"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-[#FFDD80] group-hover:scale-110 transition-transform duration-300">
                    {l.icon}
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-antonio uppercase tracking-wider group-hover:text-[#FFDD80] transition-colors leading-tight break-words flex items-center">
                    {l.title}
                  </h4>
                </div>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-light mt-auto">
                  {l.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-24 text-center">
            <a 
              href="#kontakt" 
              className="inline-block bg-[#FFDD80] text-[#003324] px-10 md:px-14 py-4 md:py-5 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#A87B00] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              Unsere Leistungen anfragen
            </a>
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

          {/* CTA */}
          <div className="mt-16 md:mt-24 text-center">
            <a 
              href="#kontakt" 
              className="inline-block bg-[#003324] text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#A87B00] hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              Referenzen ansehen & Projekt starten
            </a>
          </div>
        </div>
      </section>

      {/* JUMA Divider - Zwischen Referenzen und Prozess */}
      <div className="py-12 md:py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-6">
          <img 
            src="/images/Juma_divider.webp" 
            alt="JUMA Divider" 
            className="w-full h-auto max-h-24 md:max-h-32 object-contain"
          />
        </div>
      </div>

      {/* 7. PROZESS */}
      <section id="prozess" className="py-24 md:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="mb-16 md:mb-24">
            <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#003324] mb-10">
              Von der Vision <br />
              <span className="text-[#A87B00] italic">zur Realität.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#003324]/80 leading-relaxed font-light max-w-3xl">
              Unser bewährter Prozess führt Sie Schritt für Schritt zu Ihrem individuellen Lichtkonzept.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { 
                title: "Beratung & Konzept", 
                text: "Wir analysieren Ihre Anforderungen und entwickeln gemeinsam ein maßgeschneidertes Lichtkonzept für Ihr Projekt.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    <path d="M13 8H3"/>
                    <path d="M17 12H3"/>
                  </svg>
                )
              },
              { 
                title: "Design & Planung", 
                text: "Unsere Experten erstellen detaillierte Entwürfe, Renderings und technische Zeichnungen für Ihre Leuchten.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                )
              },
              { 
                title: "Fertigung", 
                text: "Jede Leuchte wird in unserer Wiener Manufaktur mit höchster Präzision und handwerklicher Perfektion gefertigt.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                )
              },
              { 
                title: "Montage & Service", 
                text: "Wir übernehmen die fachgerechte Montage und stehen Ihnen auch nach der Installation mit Service zur Seite.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                )
              }
            ].map((process, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl hover:translate-y-[-10px] transition-all duration-500 flex flex-col">
                <div className="w-16 h-16 bg-[#003324] rounded-full flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {process.icon}
                  </div>
                </div>
                <h3 className="text-xl font-antonio uppercase tracking-wider mb-4 text-[#003324]">{process.title}</h3>
                <p className="text-sm md:text-base text-[#003324]/70 leading-relaxed">{process.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-24 text-center">
            <a 
              href="#kontakt" 
              className="inline-block bg-[#003324] text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#003324]/90 hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              Kostenlose Erstberatung anfragen
            </a>
          </div>
        </div>
      </section>

      {/* 8. ÜBER JUMA */}
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
              <div className="pt-6">
                <a 
                  href="#kontakt" 
                  className="inline-block bg-[#003324] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#A87B00] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  Lernen Sie uns kennen
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
              <div className="flex flex-col">
                {/* JUMA Monogram über dem linken Foto */}
                <div className="mb-4 flex justify-center">
                  <img 
                    src="/assets/brand/Monogram.webp" 
                    alt="JUMA Monogram" 
                    className="h-12 sm:h-16 md:h-20 object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(34%) saturate(1204%) hue-rotate(116deg) brightness(95%) contrast(101%)' }}
                  />
                </div>
                <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl translate-y-8 sm:translate-y-12">
                  <img src="/images/Mohammad Juma_optimized.webp" alt="Mohammad Juma" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src="/images/Altes Geschäft.webp" alt="Juma Historisches Geschäft" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-24 md:py-40 bg-[#FFFFF0]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="font-poiret text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter text-[#003324] mb-10">
                Häufige Fragen
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#003324]/80 leading-relaxed font-light">
                Antworten auf die wichtigsten Fragen zu unseren Leistungen und Ihrem Projekt.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Wie lange dauert die Fertigung einer individuellen Leuchte?",
                  answer: "Die Fertigungszeit hängt von der Komplexität und dem Umfang Ihres Projekts ab. In der Regel beträgt die Produktionszeit 8-12 Wochen nach Freigabe der finalen Entwürfe. Für dringende Projekte können wir auch Express-Lösungen anbieten."
                },
                {
                  question: "Können Sie auch bestehende Leuchten restaurieren oder modernisieren?",
                  answer: "Ja, wir bieten sowohl denkmalgerechte Restauration als auch LED-Modernisierung bestehender Leuchten an. Unsere Experten analysieren den Zustand und erstellen ein individuelles Konzept für die Instandsetzung oder Modernisierung."
                },
                {
                  question: "Welche Mindestbestellmenge gilt für Sonderanfertigungen?",
                  answer: "Wir fertigen auch Einzelstücke an. Es gibt keine Mindestbestellmenge. Unser Fokus liegt auf maßgeschneiderten Lösungen, unabhängig von der Stückzahl. Jede Leuchte wird individuell für Ihr Projekt gefertigt."
                },
                {
                  question: "Bieten Sie auch Montage und Installation an?",
                  answer: "Ja, wir übernehmen die komplette Projektabwicklung inklusive fachgerechter Montage. Unser Team koordiniert die Installation weltweit und stellt sicher, dass jede Leuchte perfekt in Ihr Ambiente integriert wird."
                },
                {
                  question: "Wie funktioniert die Zusammenarbeit bei internationalen Projekten?",
                  answer: "Wir haben langjährige Erfahrung mit internationalen Projekten. Von der ersten Beratung über die Fertigung bis zur Montage koordinieren wir alles zentral. Wir arbeiten mit zuverlässigen Partnern zusammen und stellen eine reibungslose Abwicklung sicher."
                },
                {
                  question: "Können Sie Leuchten nach unseren eigenen Entwürfen fertigen?",
                  answer: "Absolut. Wir fertigen Leuchten nach Ihren individuellen Entwürfen und Spezifikationen. Unsere Experten prüfen die Machbarkeit, optimieren technische Details und realisieren Ihre Vision in höchster Qualität."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 md:p-8 text-left flex justify-between items-center hover:bg-white/30 transition-colors"
                  >
                    <h3 className="text-lg md:text-xl font-antonio uppercase tracking-wider text-[#003324] pr-8">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#A87B00] flex items-center justify-center transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 md:p-8 pt-0 text-[#003324]/70 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 md:mt-24 text-center">
              <a 
                href="#kontakt" 
                className="inline-block bg-[#A87B00] text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-antonio uppercase tracking-[0.2em] text-sm md:text-base font-bold hover:bg-[#003324] hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                Noch Fragen? Kontaktieren Sie uns
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JUMA Divider - Zwischen FAQ und Kontakt */}
      <div className="py-12 md:py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-6">
          <img 
            src="/images/Juma_divider.webp" 
            alt="JUMA Divider" 
            className="w-full h-auto max-h-24 md:max-h-32 object-contain"
          />
        </div>
      </div>

      {/* 10. KONTAKT */}
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
            
            <div className="lg:w-1/2 bg-transparent p-10 sm:p-12 md:p-20">
              <form className="space-y-6 sm:space-y-8">
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-antonio">Firma</label>
                  <input 
                    type="text" 
                    name="firma"
                    placeholder="Ihre Firma" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#FFDD80] focus:bg-white/20 text-white placeholder:text-white/30 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-antonio">Ansprechpartner</label>
                  <input 
                    type="text" 
                    name="ansprechpartner"
                    placeholder="Ihr Name" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#FFDD80] focus:bg-white/20 text-white placeholder:text-white/30 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-antonio">E-Mail</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="ihre.email@beispiel.de" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#FFDD80] focus:bg-white/20 text-white placeholder:text-white/30 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-antonio">Telefon</label>
                  <input 
                    type="tel" 
                    name="telefon"
                    placeholder="+43 123 456 789" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#FFDD80] focus:bg-white/20 text-white placeholder:text-white/30 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-xs uppercase tracking-wider mb-2 font-antonio">
                    Projektbeschreibung <span className="text-white/50 normal-case">(optional)</span>
                  </label>
                  <textarea 
                    name="projektbeschreibung"
                    rows={4}
                    placeholder="Beschreiben Sie Ihr Projekt..." 
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[#FFDD80] focus:bg-white/20 text-white placeholder:text-white/30 transition-all resize-y" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#A87B00] text-white py-5 sm:py-6 rounded-full font-antonio uppercase tracking-[0.3em] text-lg sm:text-xl hover:bg-white hover:text-[#003324] transition-all shadow-lg"
                >
                  Anfrage senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
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
