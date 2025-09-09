import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const PricingFooter = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">AsesoriaTax</h3>
            <p className="text-muted-foreground mb-4">
              Tu asesoría fiscal digital de confianza. Simplificamos tus obligaciones tributarias.
            </p>
            <Button 
              variant="cta" 
              size="sm" 
              className="w-full"
              onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp directo
            </Button>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#planes" className="hover:text-primary transition-colors">Planes</a></li>
              <li><a href="#servicios" className="hover:text-primary transition-colors">Servicios</a></li>
              <li><a href="#testimonios" className="hover:text-primary transition-colors">Testimonios</a></li>
              <li><a href="#contacto" className="hover:text-primary transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Declaración IRPF</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gestión IVA</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Altas autónomos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contabilidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gestión laboral</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@asesoriatax.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 AsesoriaTax. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PricingFooter;