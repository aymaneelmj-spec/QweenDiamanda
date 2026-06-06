import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, ShoppingBag, Check, X, Banknote, Truck, Sparkles } from 'lucide-react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { products, translations } from './data';
import { DiamondSVG } from './components/DiamondSVG';
import heroImage from './assets/images/hero_diamond_woman_1780720985552.png';
import { cn } from './lib/utils';

const AppContent = () => {
  const { language, setLanguage, theme, toggleTheme } = useAppContext();
  const t = translations[language];
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const WHATSAPP_NUMBER = "212784854164";

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = (msg: string) => {
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleOrderContext = (product: typeof products[0]) => {
    openWhatsApp(`*Salam Queen Diamanda 👑*\n\nAna mohtam b had produit : *${product.name}*\n💰 Prix : *${product.price} DH*`);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 relative",
      isDark ? "bg-dark-900 text-zinc-50" : "bg-zinc-50 text-zinc-900",
      language === 'ar' && "font-arabic"
    )}>
      {/* Scroll Progress */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gold-gradient z-[1001] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrollProgress > 0.01 
          ? isDark ? "bg-dark-900/95 backdrop-blur-md border-gold-500/20 shadow-lg shadow-black/10" : "bg-white/95 backdrop-blur-md border-gold-500/20 shadow-sm"
          : "bg-transparent border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-gold-gradient tracking-widest uppercase cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              Queen<br/>Diamanda
            </span>
          </div>

          <div className="hidden auto lg:flex flex-1 justify-center items-center gap-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <a href="#shop" className={cn("tracking-wider uppercase font-bold hover:text-gold-500 transition-colors", language === 'ar' ? 'text-xl font-arabic' : 'text-sm')}>{t.nav.shop}</a>
            <div className="w-px h-4 bg-gold-500/30" />
            <a href="#whyus" className={cn("tracking-wider uppercase font-bold hover:text-gold-500 transition-colors", language === 'ar' ? 'text-xl font-arabic' : 'text-sm')}>{t.nav.whyUs}</a>
            <div className="w-px h-4 bg-gold-500/30" />
            <a href="#contact" className={cn("tracking-wider uppercase font-bold hover:text-gold-500 transition-colors", language === 'ar' ? 'text-xl font-arabic' : 'text-sm')}>{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-gold-500 ring-offset-2 dark:ring-offset-dark-900 transition-all border-none focus:outline-none bg-zinc-200"
              >
                <img 
                  src={`https://flagcdn.com/w40/${language === 'fr' ? 'fr' : language === 'en' ? 'gb' : 'ma'}.png`} 
                  alt={`${language} flag`}
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "absolute top-full right-0 mt-3 p-2 rounded-xl border shadow-xl flex flex-col gap-2 z-50",
                      isDark ? "bg-dark-800 border-gold-500/20" : "bg-white border-zinc-200"
                    )}
                  >
                    {(['fr', 'en', 'ar'] as const)
                      .filter(lang => lang !== language)
                      .map(lang => {
                        const flagCode = lang === 'fr' ? 'fr' : lang === 'en' ? 'gb' : 'ma';
                        return (
                          <button 
                            key={lang}
                            onClick={() => {
                              setLanguage(lang);
                              setIsLangMenuOpen(false);
                            }}
                            className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all border-none focus:outline-none bg-zinc-200"
                          >
                            <img 
                              src={`https://flagcdn.com/w40/${flagCode}.png`} 
                              alt={`${lang} flag`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full border transition-colors",
                isDark ? "border-gold-500/30 text-gold-400 hover:bg-gold-500/10" : "border-zinc-300 text-zinc-600 hover:bg-zinc-100"
              )}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
           <div className={cn(
             "absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]",
             isDark ? "opacity-50" : "opacity-30"
           )} />
           <div className={cn(
             "absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px]",
             isDark ? "opacity-50" : "opacity-30"
           )} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center z-10 relative w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-start"
          >
            <h2 className="font-sans text-gold-500 tracking-[0.3em] text-sm md:text-base uppercase mb-4 mt-8 md:mt-0">
              {t.heroSubtitle}
            </h2>
            <h1 className={cn(
              "font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-gold-gradient",
              language === 'ar' ? "leading-[1.4]" : "leading-[1.1]"
            )}>
              {t.brand}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#shop" className="bg-gold-gradient text-dark-900 px-8 py-4 rounded-sm font-serif uppercase tracking-widest text-sm font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                {t.shopNow}
              </a>
              <a href="#contact" className={cn(
                "px-8 py-4 rounded-sm border uppercase tracking-widest text-sm font-medium transition-all",
                isDark ? "border-gold-500/50 text-gold-400 hover:bg-gold-500/10" : "border-gold-600/50 text-gold-600 hover:bg-gold-500/10"
              )}>
                {t.contactUs}
              </a>
            </div>
          </motion.div>

            <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center items-center h-[300px] md:h-[600px] diamond-3d"
          >
            <img 
              src={heroImage} 
              alt="Queen Diamanda Collection" 
              className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-full shadow-[0_0_50px_rgba(212,175,55,0.3)] border-2 border-gold-500/30" 
            />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-gold-gradient py-3 overflow-hidden border-y border-gold-300/30">
        <div className="marquee-content flex gap-8">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-serif text-dark-900 font-bold uppercase tracking-[0.3em] text-sm md:text-base">Queen Diamanda</span>
              <span className="text-dark-900/50">•</span>
              <span className="font-serif text-dark-900 font-bold uppercase tracking-[0.3em] text-sm md:text-base">كوين دياماندا</span>
              <span className="text-dark-900/50">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Shop Section */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">{t.nav.shop}</h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "group rounded-xl overflow-hidden border transition-all duration-500 hover:-translate-y-2",
                isDark ? "bg-dark-800 border-gold-500/20 hover:border-gold-500/60 hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)]" : "bg-white border-gold-500/20 shadow-md hover:shadow-xl hover:border-gold-500/60"
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-dark-900">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-gold-gradient text-dark-900 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-sm shadow-md">
                    {product.badge === 'Nouveau' ? t.new : t.bestseller}
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div>
                  <h3 className={cn(
                    "font-sans text-xl md:text-2xl font-bold mb-2 uppercase tracking-wide leading-tight",
                    isDark ? "text-white" : "text-zinc-900"
                  )}>
                    {product.name}
                  </h3>
                  <div className="font-serif text-4xl md:text-5xl font-black text-gold-gradient leading-none block mb-2">
                    {product.price} <span className="text-xl">DH</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    onClick={() => handleOrderContext(product)}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 rounded font-sans uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    {t.orderWhatsApp}
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "w-full py-4 rounded font-serif uppercase tracking-widest text-sm font-bold border transition-colors",
                      isDark ? "border-gold-500/50 text-gold-400 hover:bg-gold-500/10" : "border-gold-600 text-gold-600 hover:bg-gold-50"
                    )}
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section id="whyus" className={cn(
        "py-24 border-y",
        isDark ? "bg-dark-900 border-gold-500/10" : "bg-gold-50/50 border-gold-200"
      )}>
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.nav.whyUs}</h2>
            <div className="w-16 h-1 bg-gold-gradient mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { icon: Sparkles, data: t.features.quality },
              { icon: Truck, data: t.features.delivery },
              { icon: Banknote, data: t.features.payment }
            ].map((feature, i) => (
              <div key={i} className={cn(
                "p-8 rounded-xl text-center border transition-colors",
                isDark ? "bg-dark-800 border-gold-500/20 hover:border-gold-500/50" : "bg-white border-gold-200 hover:border-gold-400 shadow-sm"
              )}>
                <div className="w-16 h-16 mx-auto bg-gold-gradient rounded-full flex items-center justify-center text-dark-900 mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-4">{feature.data.title}</h3>
                <p className={cn("leading-relaxed", isDark ? "text-zinc-400" : "text-zinc-600")}>
                  {feature.data.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.contact.title}</h2>
          <div className="w-16 h-1 bg-gold-gradient mx-auto" />
        </div>

        <form 
          className={cn(
            "p-8 md:p-12 rounded-xl border shadow-xl",
            isDark ? "bg-dark-800 border-gold-500/20" : "bg-white border-gold-300"
          )}
          onSubmit={(e) => {
             e.preventDefault();
             const fd = new FormData(e.currentTarget);
             const productNameString = fd.get('product') as string;
             const matchedProduct = products.find(p => p.name === productNameString);
             const productName = matchedProduct 
               ? `${matchedProduct.name} - 💰 *${matchedProduct.price} DH*`
               : (productNameString || 'Demande Client 💎');
             const clientMessage = fd.get('message') || 'Pas de message supplémentaire.';
             const msg = `*Nouveau Contact - Queen Diamanda* ✨\n\n👤 *Nom:* ${fd.get('name')}\n📍 *Ville:* ${fd.get('city')}\n🛍️ *Produit:* ${productName}\n\n💬 *Message:*\n${clientMessage}`;
             openWhatsApp(msg);
          }}
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">{t.contact.labelName}</label>
                <input required name="name" className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">{t.contact.labelCity}</label>
                <input required name="city" className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">{t.contact.labelProduct}</label>
              <select name="product" className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 focus:outline-none focus:border-gold-500 transition-colors cursor-pointer dark:[&>option]:bg-dark-800">
                <option value="">--</option>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">{t.contact.labelMessage}</label>
              <textarea name="message" rows={4} className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 focus:outline-none focus:border-gold-500 transition-colors resize-none" />
            </div>

            <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 rounded font-sans uppercase tracking-widest text-sm transition-colors mt-4">
              {t.contact.sendWhatsApp}
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className={cn(
        "py-12 border-t text-center px-6",
        isDark ? "bg-dark-900 border-gold-500/20" : "bg-white border-zinc-200"
      )}>
        <h2 className="font-serif text-2xl font-bold text-gold-gradient uppercase tracking-widest mb-4">Queen Diamanda</h2>
        <p className={cn("text-sm tracking-widest mb-8", isDark ? "text-zinc-500" : "text-zinc-600")}>{t.footerTagline}</p>
        <p className={cn("text-xs", isDark ? "text-zinc-600" : "text-zinc-400")}>© {new Date().getFullYear()} Queen Diamanda. All rights reserved.</p>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2",
                isDark ? "bg-dark-800 border border-gold-500/30" : "bg-white"
              )}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-gold-500 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <div className="h-64 md:h-full bg-zinc-100 dark:bg-dark-900">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                {selectedProduct.badge && (
                  <span className="self-start mb-4 bg-gold-gradient text-dark-900 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-sm">
                    {selectedProduct.badge === 'Nouveau' ? t.new : t.bestseller}
                  </span>
                )}
                <h2 className="font-sans font-bold uppercase text-2xl md:text-3xl mb-4 leading-tight">{selectedProduct.name}</h2>
                <div className="font-serif text-4xl md:text-5xl font-bold text-gold-gradient mb-8 flex items-baseline gap-2">
                  {selectedProduct.price} <span className="text-2xl">DH</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check size={18} className="text-gold-500" />
                    <span className="text-sm">{t.features.quality.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={18} className="text-gold-500" />
                    <span className="text-sm">{t.features.delivery.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={18} className="text-gold-500" />
                    <span className="text-sm">{t.features.payment.title}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleOrderContext(selectedProduct)}
                  className="mt-10 w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 rounded font-sans uppercase tracking-widest text-sm transition-colors shadow-lg shadow-green-500/20 flex justify-center items-center gap-2"
                >
                  {t.orderWhatsApp}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
