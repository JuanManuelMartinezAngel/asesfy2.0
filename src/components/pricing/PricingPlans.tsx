import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, User, Users, Building } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "📌 Plan Básico",
      price: "67",
      icon: User,
      description: "Compliance fiscal básico con supervisión profesional",
      popular: false,
      features: [
        "Presentación periódica del modelo de compliance fiscal, garantizando la actualización y adecuación a la normativa vigente",
        "Todas las presentaciones estarán sujetas a revisión por parte del consultor, asegurando un control técnico-profesional sobre la información enviada a la Administración",
        "Acceso a la contratación de servicios puntuales adicionales, según las necesidades específicas de la empresa"
      ],
      buttonText: "Elegir Plan Básico",
      buttonVariant: "outline" as const,
      stripeLink: "https://buy.stripe.com/4gM9AU0fm0HJbgZ3GObo408"
    },
    {
      name: "📌 Plan Intermedio",
      price: "182",
      icon: Users,
      description: "Compliance fiscal completo con atención personalizada",
      popular: true,
      features: [
        "Todo lo del Plan Básico",
        "Presentación periódica del modelo de compliance fiscal, con supervisión y validación del consultor especializado",
        "Atención personalizada a requerimientos tributarios, incluyendo la contestación formal a notificaciones recibidas de la Administración",
        "Derecho a 5 consultas tributarias mensuales con el equipo de consultoría, para resolver dudas específicas de fiscalidad y cumplimiento",
        "En caso de necesitar más consultas, se podrán solicitar de forma adicional, facturándose según dedicación horaria del consultor",
        "Acceso a la contratación de servicios puntuales adicionales, con condiciones preferenciales"
      ],
      buttonText: "Elegir Plan Intermedio",
      buttonVariant: "cta" as const,
      stripeLink: "https://buy.stripe.com/00w9AU4vC8ab98Rfpwbo40a"
    },
    {
      name: "📌 Plan Avanzado",
      price: "333",
      icon: Building,
      description: "Compliance fiscal premium con soporte prioritario",
      popular: false,
      features: [
        "Todo lo del Plan Intermedio",
        "Presentación periódica del modelo de compliance fiscal, con control exhaustivo y revisiones avanzadas por el consultor",
        "Gestión y contestación integral de requerimientos tributarios, priorizando la atención a las necesidades más urgentes de la empresa",
        "Acceso a 5 consultas tributarias mensuales, con posibilidad de ampliar según necesidades, sujetas a facturación adicional por horas",
        "Soporte preferente para el seguimiento continuo de obligaciones fiscales, ofreciendo una atención más cercana y una revisión proactiva de los riesgos de incumplimiento",
        "Acceso a la contratación de servicios puntuales adicionales, con prioridad en la asignación de consultores"
      ],
      buttonText: "Elegir Plan Avanzado",
      buttonVariant: "hero" as const,
      stripeLink: "https://buy.stripe.com/bJe6oI8LSbmn84N4KSbo407"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Planes de Suscripción
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Servicios de compliance fiscal profesional adaptados a las necesidades de tu empresa. 
            Elige el nivel de soporte que mejor se ajuste a tu actividad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-elegant ring-2 ring-primary/20' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <div className="flex flex-col items-center justify-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}€</span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                    <span className="text-sm text-muted-foreground mt-1">IVA incluido</span>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5 flex-grow px-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed text-foreground/90 font-medium">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-6 mt-auto">
                  <Button 
                    variant={plan.buttonVariant}
                    size="lg" 
                    className="w-full font-semibold"
                    onClick={() => window.open(plan.stripeLink, "_blank")}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;