import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Facebook, Instagram, Music, MessageCircle, BookOpen } from "lucide-react";
import { SiSpotify } from "react-icons/si";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu contato. Responderemos em breve.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const socialLinks = [
    { 
      href: "https://facebook.com/desparafusadotfr", 
      icon: Facebook, 
      label: "Facebook",
      color: "text-neon-pink"
    },
    { 
      href: "https://instagram.com/desparafusad0", 
      icon: Instagram, 
      label: "Instagram",
      color: "text-neon-pink"
    },
    { 
      href: "https://audiomack.com/desparafusado", 
      icon: Music, 
      label: "Audiomack",
      color: "text-neon-pink"
    },
    { 
      href: "https://open.spotify.com/user/31btms47ts2tphbcy6n3qhjo533q", 
      icon: SiSpotify, 
      label: "Spotify",
      color: "text-neon-pink"
    },
    { 
      href: "https://wa.me/258866603366", 
      icon: MessageCircle, 
      label: "WhatsApp",
      color: "text-neon-pink"
    },
    { 
      href: "http://tfrecordz.blogspot.com", 
      icon: BookOpen, 
      label: "Blog",
      color: "text-neon-pink"
    }
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-card-dark bg-opacity-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-neon-cyan text-glow-cyan mb-4 font-mono flex items-center justify-center gap-4">
            <Mail className="w-12 h-12" />
            Contato
          </h2>
          <p className="text-lg text-gray-300">Vamos criar algo incrível juntos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card-dark rounded-xl p-8 border-glow-cyan">
            <h3 className="text-2xl font-bold text-neon-cyan mb-6 font-mono">Enviar Mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-deep-black border-neon-cyan border-opacity-30 focus:border-neon-cyan text-white"
                  placeholder="Seu nome"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-deep-black border-neon-cyan border-opacity-30 focus:border-neon-cyan text-white"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-gray-300">Assunto</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                  <SelectTrigger className="bg-deep-black border-neon-cyan border-opacity-30 focus:border-neon-cyan text-white">
                    <SelectValue placeholder="Selecione o assunto" />
                  </SelectTrigger>
                  <SelectContent className="bg-deep-black border-neon-cyan border-opacity-30">
                    <SelectItem value="beat-custom">Beat Personalizado</SelectItem>
                    <SelectItem value="collaboration">Colaboração</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-gray-300">Mensagem</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-deep-black border-neon-cyan border-opacity-30 focus:border-neon-cyan text-white min-h-[120px]"
                  placeholder="Sua mensagem..."
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-neon-cyan hover:bg-neon-green text-black font-bold py-3 px-6 rounded-lg border-glow-cyan hover:border-glow-green transition-all duration-300"
              >
                <Send className="w-4 h-4 mr-2" />
                {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <div className="bg-card-dark rounded-xl p-8 border-glow-pink">
              <h3 className="text-2xl font-bold text-neon-pink mb-6 font-mono">Redes Sociais</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-deep-black rounded-lg border border-neon-pink border-opacity-30 hover:border-neon-pink hover:bg-neon-pink hover:bg-opacity-10 transition-all duration-300 group"
                  >
                    <link.icon className="text-neon-pink text-2xl mr-4 group-hover:text-neon-green transition-colors duration-300" />
                    <span className="text-white group-hover:text-neon-green transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
