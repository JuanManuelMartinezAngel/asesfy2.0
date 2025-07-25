import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, DollarSign, Clock, Heart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María García",
      role: "Emprendedora",
      avatar: "MG",
      testimonial: "Revolucionó mi gestión fiscal. Antes perdía horas intentando entender formularios complicados, ahora solo subo mis documentos y mi asesor personal se encarga de todo. La tranquilidad que me da es impagable.",
      metrics: {
        saved: "€2,400",
        time: "15h",
        satisfaction: "100%"
      }
    },
    {
      name: "Carlos Ruiz",
      role: "Freelancer",
      avatar: "CR",
      testimonial: "La tranquilidad que me da saber que un experto gestiona mis impuestos no tiene precio. Mi asesor me encontró deducciones que yo ni sabía que existían.",
      metrics: {
        saved: "€1,800",
        time: "12h",
        satisfaction: "100%"
      }
    },
    {
      name: "Ana López",
      role: "Consultora",
      avatar: "AL",
      testimonial: "Tan fácil como subir fotos a Instagram. La plataforma es intuitiva y mi asesora es súper profesional. Me ha ahorrado mucho dinero y tiempo.",
      metrics: {
        saved: "€3,100",
        time: "8h",
        satisfaction: "100%"
      }
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Testimonios reales
          </h2>
          <p className="text-xl text-muted-foreground">
            Descubre por qué nuestros clientes confían en nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-current" />
                  ))}
                </div>

                {/* Testimonial */}
                <p className="text-muted-foreground mb-8 leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-success mr-1" />
                    </div>
                    <div className="font-bold text-success text-sm">{testimonial.metrics.saved}</div>
                    <div className="text-xs text-muted-foreground">Ahorrado</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <div className="font-bold text-primary text-sm">{testimonial.metrics.time}</div>
                    <div className="text-xs text-muted-foreground">Tiempo ahorrado</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="w-4 h-4 text-destructive mr-1" />
                    </div>
                    <div className="font-bold text-destructive text-sm">{testimonial.metrics.satisfaction}</div>
                    <div className="text-xs text-muted-foreground">Satisfacción</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Button
            variant="cta"
            size="xl"
            onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            className="w-full md:w-auto"
          >
            ¿Quieres ser el próximo testimonio?
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
            className="w-full md:w-auto"
          >
            Ver más testimonios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;