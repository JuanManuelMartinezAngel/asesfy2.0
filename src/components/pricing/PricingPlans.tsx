import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, User, Users, Building } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "60",
      icon: User,
      description: "Ideal para autónomos con actividad sencilla",
      popular: false,
      features: [
        "Hasta 5 facturas trimestrales",
        "Alta y baja de autónomo",
        "Presentación de modelos básicos (303, 130)",
        "Asesoramiento por email",
        "1 revisión anual extra"
      ],
      buttonText: "Quiero este plan",
      buttonVariant: "outline" as const
    },
    {
      name: "Plan Profesional",
      price: "150",
      icon: Users,
      description: "Para profesionales que necesitan más gestión",
      popular: true,
      features: [
        "Hasta 20 facturas trimestrales",
        "Asesoramiento mensual (1h)",
        "Factura electrónica incluida",
        "Gestión de requerimientos AEAT",
        "Resumen anual y modelos adicionales",
        "Consultoría personalizada"
      ],
      buttonText: "Me interesa este plan",
      buttonVariant: "cta" as const
    },
    {
      name: "Plan Premium",
      price: "300",
      icon: Building,
      description: "Máxima tranquilidad para tu negocio",
      popular: false,
      features: [
        "Facturas ilimitadas",
        "Contabilidad completa + libros + cuentas anuales",
        "Gestión laboral básica (hasta 3 empleados)",
        "2h de consultoría al mes",
        "Trámites internacionales (modelo 720, 233, etc.)",
        "Soporte prioritario"
      ],
      buttonText: "Quiero máxima tranquilidad",
      buttonVariant: "hero" as const
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Planes de Suscripción Mensual
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a tu negocio. Sin permanencia, cancela cuando quieras.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`relative h-full ${plan.popular ? 'border-primary shadow-elegant' : 'border-border'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}€</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-6">
                  <Button 
                    variant={plan.buttonVariant}
                    size="lg" 
                    className="w-full"
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