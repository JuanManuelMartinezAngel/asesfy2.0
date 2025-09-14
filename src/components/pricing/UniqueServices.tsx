import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calculator, BookOpen, Users, Receipt, Mail } from "lucide-react";
import ServiceRequestModal from "@/components/ServiceRequestModal";

const UniqueServices = () => {
  const [selectedService, setSelectedService] = useState<{
    name: string;
    price: string;
    category: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceRequest = (serviceName: string, servicePrice: string, category: string) => {
    setSelectedService({ name: serviceName, price: servicePrice, category });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const serviceCategories = [
    {
      title: "Altas y Trámites Generales",
      icon: FileText,
      services: [
        { name: "Alta Express autónomo", price: "90 €" },
        { name: "Alta ROI", price: "75 €" },
        { name: "Cambio de base RETA", price: "19,95 €" }
      ]
    },
    {
      title: "Fiscalidad y Modelos",
      icon: Calculator,
      services: [
        { name: "Modelo 100", price: "50 €" },
        { name: "Modelo 303 adicional", price: "40 €" },
        { name: "Modelo 233", price: "desde 90 €" },
        { name: "Modelos 720/721/151", price: "50 € + presupuesto" }
      ]
    },
    {
      title: "Contabilidad",
      icon: BookOpen,
      services: [
        { name: "Libros + presentación", price: "150 €" },
        { name: "Cuentas anuales", price: "250 €" }
      ]
    },
    {
      title: "Laboral",
      icon: Users,
      services: [
        { name: "Alta TGSS y contrato", price: "90 €" },
        { name: "Despidos", price: "desde 79,95 €" },
        { name: "Nóminas", price: "30 €" }
      ]
    },
    {
      title: "Facturación Electrónica",
      icon: Receipt,
      services: [
        { name: "Factura puntual", price: "30 €" },
        { name: "OpenGes", price: "90 €" }
      ]
    },
    {
      title: "Requerimientos AEAT",
      icon: Mail,
      services: [
        { name: "Gestión requerimientos", price: "desde 75 €" },
        { name: "Alegaciones", price: "75 €" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Servicios Únicos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Si no deseas una suscripción, también ofrecemos servicios puntuales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="h-full hover:shadow-elegant transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <span className="text-sm text-foreground">{service.name}</span>
                      <span className="text-sm font-semibold text-primary">{service.price}</span>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    {category.services.map((service, serviceIndex) => (
                      <Button 
                        key={serviceIndex}
                        variant="outline" 
                        size="sm" 
                        className="w-full mb-2"
                        onClick={() => handleServiceRequest(service.name, service.price, category.title)}
                      >
                        Solicitar {service.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="cta" size="lg">
            Ver todos los servicios
          </Button>
        </div>
      </div>

      {/* Modal para solicitar servicios */}
      {selectedService && (
        <ServiceRequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          serviceName={selectedService.name}
          servicePrice={selectedService.price}
          category={selectedService.category}
        />
      )}
    </section>
  );
};

export default UniqueServices;