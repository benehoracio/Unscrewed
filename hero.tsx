import { Play, ShoppingCart } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-pink from-opacity-20 via-deep-black to-neon-purple to-opacity-20"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Music production workspace" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neon-green text-glow-green mb-6 font-mono">
          UNSCREWED
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl text-neon-cyan text-glow-cyan mb-8 font-mono">
          Drip Music. Neon Energy. Global Vibes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('music')}
            className="bg-neon-pink hover:bg-neon-green text-black font-bold py-3 px-8 rounded-lg border-glow-pink hover:border-glow-green hover-glow transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Ouvir Agora
          </button>
          <button 
            onClick={() => scrollToSection('beats')}
            className="bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold py-3 px-8 rounded-lg border-glow-cyan hover-glow transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Comprar Beats
          </button>
        </div>
      </div>
    </section>
  );
}
