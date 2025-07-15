import { useCart, useUpdateCartItem, useRemoveFromCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export default function ShoppingCart({ isOpen, onClose, sessionId }: ShoppingCartProps) {
  const { data: cartItems = [], isLoading } = useCart(sessionId);
  const updateCartMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const total = cartItems.reduce((sum, item) => sum + (parseFloat(item.beat.price) * (item.quantity || 1)), 0);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateCartMutation.mutate({ id, quantity, sessionId });
  };

  const handleRemoveItem = (id: number) => {
    removeFromCartMutation.mutate({ id, sessionId });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    let message = 'Olá! Gostaria de comprar os seguintes beats:\n\n';
    cartItems.forEach(item => {
      message += `${item.beat.name} - $${item.beat.price} (Qty: ${item.quantity})\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/258866603366?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 lightbox">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-card-dark rounded-xl p-6 max-w-md w-full border-glow-pink">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-neon-pink font-mono">Carrinho</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-neon-cyan hover:text-neon-green transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center text-gray-400">Carregando...</div>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-400 text-center">Seu carrinho está vazio</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-deep-black rounded-lg border border-neon-pink border-opacity-20">
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.beat.name}</h4>
                    <p className="text-gray-400">${item.beat.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="text-neon-cyan hover:text-neon-green h-8 w-8"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-white px-2 min-w-[2rem] text-center">{item.quantity || 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="text-neon-cyan hover:text-neon-green h-8 w-8"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-neon-pink hover:text-red-500 ml-2 h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="border-t border-neon-pink border-opacity-20 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-white">Total:</span>
              <span className="text-2xl font-bold text-neon-green">${total.toFixed(2)}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-neon-green hover:bg-neon-pink text-black font-bold py-3 px-6 rounded-lg border-glow-green hover:border-glow-pink transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
