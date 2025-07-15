import { Headphones } from "lucide-react";

export default function MusicPlayer() {
  return (
    <section id="music" className="py-16 px-4 sm:px-6 lg:px-8 bg-card-dark bg-opacity-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neon-cyan text-glow-cyan mb-4 font-mono flex items-center justify-center gap-4">
            <Headphones className="w-12 h-12" />
            Escuta no Audiomack
          </h2>
          <p className="text-lg text-gray-300">Mergulhe nos beats que definem o som do futuro</p>
        </div>
        
        <div className="bg-card-dark rounded-xl p-6 border-glow-cyan">
          <iframe 
            src="https://audiomack.com/desparafusado/embed" 
            className="w-full h-80 rounded-lg border-2 border-neon-cyan border-opacity-30" 
            scrolling="no"
            frameBorder="0"
            title="Audiomack Player"
          />
        </div>
      </div>
    </section>
  );
}
