import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchBar } from '@/components/SearchBar'
import { Filters } from '@/components/Filters'
import { ServiceCard } from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import { Service, supabase } from '@/lib/supabase'
import { Loader2, Search } from 'lucide-react'

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('categories')?.split(',').filter(Boolean) || []
  )

  // Load services from Supabase
  useEffect(() => {
    async function loadServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('title', { ascending: true })

        if (error) throw error
        setServices(data || [])
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  // Filter services based on search and categories
  useEffect(() => {
    let filtered = services

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(term) ||
        (service.summary && service.summary.toLowerCase().includes(term))
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(service =>
        selectedCategories.includes(service.category)
      )
    }

    setFilteredServices(filtered)
  }, [services, searchTerm, selectedCategories])

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','))
    
    setSearchParams(params, { replace: true })
  }, [searchTerm, selectedCategories, setSearchParams])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
  }

  const hasActiveFilters = searchTerm || selectedCategories.length > 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Servicios Puntuales
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Encuentra el servicio fiscal que necesitas. Añade los que te interesen a tu carrito y solicita un presupuesto personalizado.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            <div className="max-w-md mx-auto">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar por título o descripción..."
              />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Filters
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Cargando servicios...</span>
            </div>
          )}

          {/* Services Grid */}
          {!loading && (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">
                    {hasActiveFilters ? 'No se encontraron servicios' : 'No hay servicios disponibles'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {hasActiveFilters 
                      ? 'Intenta ajustar tus filtros o términos de búsqueda'
                      : 'Estamos trabajando en añadir más servicios'
                    }
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={handleClearFilters} variant="outline">
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Results Count */}
          {!loading && filteredServices.length > 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Mostrando {filteredServices.length} de {services.length} servicios
              {hasActiveFilters && ' (filtrados)'}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}