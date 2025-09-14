import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchAndFilters from "@/components/services/SearchAndFilters";
import ServiceList from "@/components/services/ServiceList";
import CartSidebar from "@/components/services/CartSidebar";
import QuoteForm from "@/components/services/QuoteForm";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { services } from "@/data/services";
import { ShoppingCart } from 'lucide-react';

function ServicesPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { state, openCart } = useCart();

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-dark py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Servicios Puntuales
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Encuentra y solicita los servicios fiscales y laborales que necesitas. 
            Sin compromisos, solo paga por lo que uses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p className="text-sm text-muted-foreground">
              ✓ Sin precios ocultos ✓ Presupuesto personalizado ✓ Respuesta rápida
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and Filters */}
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onClearFilters={handleClearFilters}
            />

            {/* Services List */}
            <ServiceList
              services={services}
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 h-[calc(100vh-6rem)] flex flex-col min-h-0">
              {/* Cart Button for Desktop */}
              <div className="hidden lg:block mb-4">
                <Button
                  onClick={openCart}
                  variant="outline"
                  className="w-full justify-between"
                  size="lg"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Carrito</span>
                  </div>
                  {state.items.length > 0 && (
                    <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                      {state.items.length}
                    </span>
                  )}
                </Button>
              </div>

              {/* Scrollable Form Container */}
              <div className="flex-1 overflow-y-auto scroll-touch">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
      
      <Footer />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <CartProvider>
      <ServicesPageContent />
    </CartProvider>
  );
}
