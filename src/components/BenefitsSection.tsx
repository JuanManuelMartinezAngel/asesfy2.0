import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, TrendingUp, UserCheck } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Seguridad total",
      features: ["Cifrado AES-256", "RGPD compliance", "Acceso restringido"],
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: Clock,
      title: "Ahorra tiempo",
      features: ["Proceso automatizado", "Sin colas ni esperas", "Disponible 24/7"],
      bgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Maximiza tus ahorros",
      features: ["Análisis exhaustivo", "Deducciones máximas", "Estrategias fiscales"],
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    },
    {
      icon: UserCheck,
      title: "Asesor personal",
      features: ["Asesor dedicado", "Comunicación directa", "Experiencia certificada"],
      bgColor: "bg-turquoise/10",
      iconColor: "text-turquoise"
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Por qué elegir nuestro servicio
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    {benefit.title}
                  </h3>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;