import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, User, Users, Building } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Plan Básico",
      price: "69",
      icon: User,
      description: "Para autónomos que empiezan o con pocos trámites",
      popular: false,
      features: [
        "Presentación trimestral de impuestos (hasta 20 facturas/trim.)",
        "Modelo anual (resumen IVA/IRPF)",
        "1 consulta fiscal/mes (email o llamada corta)",
        "15% de descuento en servicios puntuales"
      ],
      buttonText: "Elegir Plan Básico",
      buttonVariant: "outline" as const,
      stripeUrl: "https://buy.stripe.com/4gM9AU0fm0HJbgZ3GObo408",
      subtitle: "Presentamos tus impuestos sin complicarte y te acompañamos por chat/llamada corta. Incluye trimestrales (hasta 20 facturas/trim.), modelo anual y 1 consulta/mes. Además, 15% de descuento en servicios puntuales."
    },
    {
      name: "Plan Intermedio",
      price: "159",
      icon: Users,
      description: "Para autónomos con más volumen o pymes pequeñas",
      popular: true,
      features: [
        "Todo lo del Plan Básico",
        "Trimestrales hasta 50 facturas/trim.",
        "Contabilidad mensual básica (registro ingresos/gastos + libros)",
        "2 consultas/mes (email o videollamada)",
        "Requerimientos AEAT simples incluidos",
        "1 modelo adicional/año (p. ej., 036, 840 o ROI)",
        "20% de descuento en servicios puntuales"
      ],
      buttonText: "Elegir Plan Intermedio",
      buttonVariant: "cta" as const,
      stripeUrl: "https://buy.stripe.com/28E14o4vC0HJ84N3GObo40c",
      subtitle: "Nos ocupamos también de tu contabilidad. Trimestrales (hasta 50 facturas/trim.), 2 consultas/mes, requerimientos simples incluidos y 1 modelo adicional al año (036/840/ROI). 20% de descuento en servicios puntuales."
    },
    {
      name: "Plan Avanzado",
      price: "259",
      icon: Building,
      description: "Para pymes con mayor complejidad y prioridad alta",
      popular: false,
      features: [
        "Todo lo del Plan Intermedio",
        "Trimestrales sin límite de facturas",
        "Nóminas básicas hasta 3 empleados (extras con tarifa reducida)",
        "Requerimientos complejos (AEAT/Seg. Social)",
        "Hasta 5 consultas/mes",
        "SLA prioridad: respuesta <4 h laborables",
        "25–30% de descuento en puntuales",
        "⚠️ CIERRE CONTABLE y CUENTAS ANUALES: NO incluidos → Add-on con precio preferente"
      ],
      buttonText: "Elegir Plan Avanzado",
      buttonVariant: "hero" as const,
      stripeUrl: "https://buy.stripe.com/bJe6oI8LSbmn84N4KSbo407",
      subtitle: "Servicio proactivo con prioridad. Trimestrales sin límite, nóminas (hasta 3 empleados), requerimientos complejos y hasta 5 consultas/mes. SLA <4 h. 25–30% de descuento en puntuales. Cierre contable y Cuentas Anuales no incluidos (add-on)."
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
                    <span className="text-muted-foreground">/mes (IVA incl.)</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground italic mb-4 px-2">
                    "{plan.subtitle}"
                  </div>
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
                    onClick={() => window.open(plan.stripeUrl, "_blank")}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* Footer Messages */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-lg text-muted-foreground">
            IVA incluido. Sin permanencia. Cancela cuando quieras.
          </p>
          <p className="text-base text-muted-foreground">
            ¿Necesitas algo suelto?{" "}
            <a href="/services" className="text-primary hover:underline">
              Mira nuestros Servicios Puntuales
            </a>
            . Si te suscribes, tendrás precio preferente.
          </p>
        </div>

        {/* Add-ons and Key Conditions */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Add-ons y condiciones clave</h3>
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Servicios adicionales</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Cuentas Anuales</strong> (NO incluidas en ningún plan): add-on con precio preferente para suscriptores</li>
                  <li>• <strong>Cierre contable</strong>: también add-on (preferente para Plan Avanzado)</li>
                  <li>• <strong>Nóminas extra</strong>: a partir del 4.º empleado, tarifa reducida por empleado</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Límites y condiciones</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Límites de facturas</strong>: contadores por trimestre claros en Básico/Intermedio</li>
                  <li>• <strong>Plan Avanzado</strong>: sin límite de facturas trimestrales</li>
                  <li>• Todos los planes incluyen descuentos progresivos en servicios puntuales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;