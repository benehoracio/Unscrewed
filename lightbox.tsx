import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ imageUrl, isOpen, onClose }: LightboxProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 lightbox">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative max-w-4xl w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-neon-cyan hover:text-neon-green transition-colors duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </Button>
          <img 
            src={imageUrl} 
            alt="Gallery image" 
            className="w-full h-auto rounded-lg border-2 border-neon-green border-opacity-30"
          />
        </div>
      </div>
    </div>
  );
}
