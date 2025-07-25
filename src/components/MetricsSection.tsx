import { Button } from "@/components/ui/button";
import { Star, FileText, DollarSign } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      icon: Star,
      value: "98%",
      label: "Satisfacción del cliente",
      color: "text-warning"
    },
    {
      icon: FileText,
      value: "15K+",
      label: "Declaraciones procesadas",
      color: "text-primary"
    },
    {
      icon: DollarSign,
      value: "€2.4M",
      label: "Ahorros generados",
      color: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Nuestro impacto en números
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center border border-border">
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {metric.value}
                </div>
                <div className="text-muted-foreground text-lg">
                  {metric.label}
                </div>
              </div>
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

export default MetricsSection;