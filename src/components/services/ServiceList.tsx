import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Service, categories } from '@/data/services';
import AddServiceModal from './AddServiceModal';
import { Plus } from 'lucide-react';

interface ServiceListProps {
  services: Service[];
  searchTerm: string;
  selectedCategories: string[];
}

export default function ServiceList({ services, searchTerm, selectedCategories }: ServiceListProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter services based on search and categories
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(service.category);
    
    return matchesSearch && matchesCategory;
  });

  // Group services by category
  const servicesByCategory = categories.reduce((acc, category) => {
    const categoryServices = filteredServices.filter(service => service.category === category);
    if (categoryServices.length > 0) {
      acc[category] = categoryServices;
    }
    return acc;
  }, {} as Record<string, Service[]>);

  const handleAddService = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AUTÓNOMOS': return '🧾';
      case 'SOCIEDADES': return '🏢';
      case 'LABORAL': return '👥';
      case 'TRIMESTRE': return '📊';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AUTÓNOMOS': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SOCIEDADES': return 'bg-green-100 text-green-800 border-green-200';
      case 'LABORAL': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'TRIMESTRE': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (Object.keys(servicesByCategory).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron servicios</h3>
        <p className="text-gray-500">
          Intenta ajustar tu búsqueda o seleccionar diferentes categorías
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getCategoryIcon(category)}</span>
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              <Badge variant="outline" className={getCategoryColor(category)}>
                {categoryServices.length} servicio{categoryServices.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {categoryServices.map((service) => (
                <Card key={service.code} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold leading-tight mb-2">
                          {service.name}
                        </CardTitle>
                        {service.description && (
                          <CardDescription className="text-sm">
                            {service.description}
                          </CardDescription>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddService(service)}
                        size="sm"
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Añadir
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {service.details && service.details.length > 0 && (
                    <CardContent className="pt-0">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Información requerida:</span>{' '}
                        {service.details.map(detail => detail.label).join(', ')}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AddServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}