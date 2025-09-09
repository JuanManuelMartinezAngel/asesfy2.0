import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, DollarSign } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="inicio" className="pt-32 pb-20 bg-gradient-dark min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="bg-secondary/50 text-primary border-primary/20">
              Plataforma Líder en Gestión Fiscal
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Gestión Fiscal{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Simplificada
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Automatiza tu gestión fiscal, accede a asesoramiento profesional y optimiza 
                tus obligaciones tributarias con nuestra plataforma integral.
              </p>
            </div>

            <Button
              variant="hero"
              size="xl"
              onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
              className="w-full sm:w-auto"
            >
              Empezar ahora
            </Button>
          </div>

          {/* Right Column - Dashboard Panel */}
          <div className="lg:order-last order-first">
            <Card className="bg-card shadow-card border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Panel de Control
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-foreground">Declaración IRPF</span>
                    </div>
                    <div className="text-success font-medium">✓</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-foreground">IVA Trimestral</span>
                    </div>
                    <div className="text-success font-medium">✓</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <Circle className="w-5 h-5 text-warning" />
                      <span className="text-foreground">Nóminas</span>
                    </div>
                    <div className="text-warning font-medium">⏳</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">Ahorro Fiscal</span>
                    </div>
                    <div className="text-primary font-bold text-xl">€2,340</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;