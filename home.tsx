import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import MusicPlayer from "@/components/music-player";
import BeatStore from "@/components/beat-store";
import VideoSection from "@/components/video-section";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import ShoppingCart from "@/components/shopping-cart";
import Lightbox from "@/components/lightbox";
import { generateSessionId } from "@/lib/cart";

export default function Home() {
  const [sessionId, setSessionId] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = localStorage.getItem("sessionId");
    if (!storedSessionId) {
      storedSessionId = generateSessionId();
      localStorage.setItem("sessionId", storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openLightbox = (imageUrl: string) => setLightboxImage(imageUrl);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navigation onCartClick={openCart} sessionId={sessionId} />
      
      <main>
        <Hero />
        <MusicPlayer />
        <BeatStore sessionId={sessionId} />
        <VideoSection />
        <Gallery onImageClick={openLightbox} />
        <Contact />
      </main>

      <footer className="bg-deep-black border-t border-neon-cyan border-opacity-20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 UNSCREWED. Todos os direitos reservados.</p>
          <p className="text-gray-500 text-sm mt-2">Desenvolvido com neon energy e global vibes</p>
        </div>
      </footer>

      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        sessionId={sessionId}
      />

      <Lightbox 
        imageUrl={lightboxImage} 
        isOpen={!!lightboxImage} 
        onClose={closeLightbox} 
      />
    </div>
  );
}
