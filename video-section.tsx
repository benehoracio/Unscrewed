import { Video } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card-dark bg-opacity-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neon-purple text-glow-purple mb-4 font-mono flex items-center justify-center gap-4">
            <Video className="w-12 h-12" />
            Vídeo Promocional
          </h2>
          <p className="text-lg text-gray-300">Assista ao processo criativo por trás dos beats</p>
        </div>
        
        <div className="relative bg-card-dark rounded-xl p-6 border-glow-purple">
          <div className="aspect-video">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              className="w-full h-full rounded-lg border-2 border-neon-purple border-opacity-30" 
              frameBorder="0" 
              allowFullScreen
              title="Vídeo Promocional"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
