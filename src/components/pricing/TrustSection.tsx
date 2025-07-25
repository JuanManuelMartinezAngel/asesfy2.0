import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, Award } from "lucide-react";

const TrustSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Autónoma",
      rating: 5,
      comment: "Excelente servicio. Me han resuelto todas las dudas y mi declaración de la renta quedó perfecta."
    },
    {
      name: "Carlos Ruiz",
      role: "Freelancer",
      comment: "Muy profesionales. El plan básico es perfecto para mi negocio y el precio es muy competitivo."
    },
    {
      name: "Ana López",
      role: "Consultora",
      comment: "Llevo 2 años con ellos y siempre cumplen los plazos. Recomiendo el plan profesional al 100%."
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      title: "Respuesta en 24-48h",
      description: "Garantizamos respuesta rápida a todas tus consultas"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Tus datos están protegidos con máxima seguridad"
    },
    {
      icon: Award,
      title: "Asesores certificados",
      description: "Equipo de profesionales colegiados y experimentados"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Testimonios y Confianza
          </h2>
          <p className="text-xl text-muted-foreground">
            Miles de clientes confían en nosotros
          </p>
        </div>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Garantías */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{guarantee.title}</h3>
                <p className="text-muted-foreground">{guarantee.description}</p>
              </div>
            );
          })}
        </div>

        {/* Logos de plataformas */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Utilizamos las mejores plataformas</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <Badge variant="outline" className="px-4 py-2">AEAT</Badge>
            <Badge variant="outline" className="px-4 py-2">Seg. Social</Badge>
            <Badge variant="outline" className="px-4 py-2">FactuSOL</Badge>
            <Badge variant="outline" className="px-4 py-2">ContaSOL</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;