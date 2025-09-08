import { Dumbbell, Heart, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const FitLifeFooter = () => {
  return (
    <footer className="bg-surface/50 border-t border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="font-orbitron font-bold text-xl gradient-text">
                FitLife AI
              </div>
            </div>
            <p className="text-white/70 max-w-md mb-6">
              Transforme seu corpo com treinos e nutrição personalizados por inteligência artificial. 
              Sua jornada fitness inteligente começa aqui.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-all hover-lift">
                <Instagram className="w-5 h-5 text-white/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-all hover-lift">
                <Twitter className="w-5 h-5 text-white/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-all hover-lift">
                <Facebook className="w-5 h-5 text-white/80" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass hover:bg-white/10 flex items-center justify-center transition-all hover-lift">
                <Youtube className="w-5 h-5 text-white/80" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Treinos IA</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Nutrição Personal</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Acompanhamento</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Comunidade</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins font-semibold text-white mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">
            © 2024 FitLife AI. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary-pink" />
            <span>para sua transformação</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FitLifeFooter;