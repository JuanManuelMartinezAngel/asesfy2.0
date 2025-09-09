import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const PricingHeader = () => {
  return (
    <header className="bg-gradient-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary mb-4">AsesoriaTax</h1>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Tu asesoría fiscal 100% digital, rápida y sin líos
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Planes de suscripción mensual adaptados a tus necesidades
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg"
              onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            >
              Empezar ahora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg"
              onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Solicitar llamada gratuita
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PricingHeader;