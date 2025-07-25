import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, UserCheck, CheckCircle, Shield, Clock, TrendingUp } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Sube tus documentos",
      description: "Arrastra y suelta tus facturas, recibos y documentos fiscales en nuestra plataforma segura.",
      features: ["Subida segura y encriptada", "Organización automática", "Múltiples formatos"]
    },
    {
      number: "2", 
      icon: UserCheck,
      title: "Tu asesor revisa todo",
      description: "Un asesor fiscal certificado revisa toda tu información, detecta deducciones y optimiza tu declaración.",
      features: ["Asesor personal asignado", "Revisión exhaustiva", "Optimización fiscal"]
    },
    {
      number: "3",
      icon: CheckCircle,
      title: "Recibes todo listo",
      description: "Recibe tu declaración completada, informes detallados y toda la documentación oficial.",
      features: ["Declaración completada", "Informes detallados", "Documentación oficial"]
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Cómo funciona nuestro proceso
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solo tres pasos para tener tu declaración de la renta completamente gestionada
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Paso {step.number} – {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            variant="cta"
            size="xl"
            onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
          >
            Empezar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;