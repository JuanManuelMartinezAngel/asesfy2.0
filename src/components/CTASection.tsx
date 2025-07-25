import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, UserCheck, Shield, Zap } from "lucide-react";

const CTASection = () => {
  const benefits = [
    {
      icon: Clock,
      text: "Primer contacto en menos de 2 horas"
    },
    {
      icon: UserCheck,
      text: "Asesor personal asignado"
    },
    {
      icon: Shield,
      text: "Proceso 100% digital y seguro"
    },
    {
      icon: Zap,
      text: "Sin compromisos a largo plazo"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-dark border-border shadow-elegant max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Empieza hoy a olvidarte de tus impuestos
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12">
              Deja que un asesor personal lo gestione todo por ti.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 text-left">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Button
                variant="cta"
                size="xl"
                onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
                className="w-full md:w-auto"
              >
                Empezar ahora
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
                className="w-full md:w-auto"
              >
                Solo quiero más info por ahora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;