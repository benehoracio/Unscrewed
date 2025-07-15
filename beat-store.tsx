import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAddToCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { Disc, Play, Download, ShoppingCart, MessageCircle } from "lucide-react";
import type { Beat } from "@shared/schema";

interface BeatStoreProps {
  sessionId: string;
}

export default function BeatStore({ sessionId }: BeatStoreProps) {
  const { toast } = useToast();
  const { data: beats = [], isLoading } = useQuery<Beat[]>({
    queryKey: ["/api/beats"],
  });
  
  const addToCartMutation = useAddToCart();

  const handleAddToCart = async (beatId: number, price: string) => {
    try {
      await addToCartMutation.mutateAsync({
        sessionId,
        beatId,
        quantity: 1,
      });
      toast({
        title: "Adicionado ao carrinho!",
        description: "O beat foi adicionado ao seu carrinho.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar ao carrinho.",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = (beatName: string) => {
    const message = `Olá! Gostaria de comprar o beat: ${beatName}`;
    const whatsappUrl = `https://wa.me/258866603366?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <section id="beats" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-neon-pink text-glow-pink mb-4 font-mono flex items-center justify-center gap-4">
              <Disc className="w-12 h-12" />
              Loja de Beats
            </h2>
            <p className="text-lg text-gray-300">Beats exclusivos para elevar sua música ao próximo nível</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card-dark rounded-xl p-6 border-l-4 border-neon-pink animate-pulse">
                <div className="h-6 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-600 rounded mb-4"></div>
                <div className="h-10 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="beats" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neon-pink text-glow-pink mb-4 font-mono flex items-center justify-center gap-4">
            <Disc className="w-12 h-12" />
            Loja de Beats
          </h2>
          <p className="text-lg text-gray-300">Beats exclusivos para elevar sua música ao próximo nível</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beats.map((beat) => (
            <div key={beat.id} className="bg-card-dark rounded-xl p-6 border-l-4 border-neon-pink border-glow-pink hover-glow transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-mono">{beat.name}</h3>
                <span className="text-2xl font-bold text-neon-green">${beat.price}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-400 mb-2">Gênero: {beat.genre}</p>
                <p className="text-gray-400 mb-2">BPM: {beat.bpm}</p>
                <p className="text-gray-400">Duração: {beat.duration}</p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <button className="bg-neon-green bg-opacity-20 text-neon-green border border-neon-green border-opacity-30 px-4 py-2 rounded-lg hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Preview
                </button>
                <button className="bg-neon-purple bg-opacity-20 text-neon-purple border border-neon-purple border-opacity-30 px-4 py-2 rounded-lg hover:bg-neon-purple hover:text-black transition-all duration-300 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Demo
                </button>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAddToCart(beat.id, beat.price)}
                  disabled={addToCartMutation.isPending}
                  className="flex-1 bg-neon-pink hover:bg-neon-green text-black font-bold py-3 px-4 rounded-lg border-glow-pink hover:border-glow-green transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar
                </button>
                <button 
                  onClick={() => handleBuyNow(beat.name)}
                  className="flex-1 bg-neon-green hover:bg-neon-pink text-black font-bold py-3 px-4 rounded-lg border-glow-green hover:border-glow-pink transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
