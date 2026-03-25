import { ScrollProgress } from '@/components/ScrollProgress';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Gallery } from '@/components/Gallery';
import { Visit } from '@/components/Visit';
import { Footer } from '@/components/Footer';
import { LanguageContext, useLanguageProvider } from '@/hooks/useLanguage';

const Index = () => {
  const languageValue = useLanguageProvider();

  return (
    <LanguageContext.Provider value={languageValue}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ScrollProgress />
        <Header />
        <Hero />
        <Features />
        <Gallery />
        <Visit />
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
};

export default Index;
