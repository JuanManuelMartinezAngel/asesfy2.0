import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Check } from 'lucide-react'
import { Service } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'

interface ServiceCardProps {
  service: Service
}

const CATEGORY_COLORS = {
  AUTONOMOS: 'bg-blue-100 text-blue-800 border-blue-200',
  SOCIEDADES: 'bg-green-100 text-green-800 border-green-200',
  LABORAL: 'bg-purple-100 text-purple-800 border-purple-200',
  TRIMESTRES: 'bg-orange-100 text-orange-800 border-orange-200'
}

const CATEGORY_LABELS = {
  AUTONOMOS: 'Autónomos',
  SOCIEDADES: 'Sociedades',
  LABORAL: 'Laboral',
  TRIMESTRES: 'Trimestres'
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart, isInCart } = useCart()
  const inCart = isInCart(service.slug)

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart({
        slug: service.slug,
        title: service.title,
        category: service.category
      })
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <Badge 
            variant="secondary" 
            className={`${CATEGORY_COLORS[service.category]} text-xs font-medium`}
          >
            {CATEGORY_LABELS[service.category]}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
        {service.summary && (
          <CardDescription className="text-sm leading-relaxed">
            {service.summary}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col justify-end pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={inCart}
          variant={inCart ? "secondary" : "default"}
          className="w-full"
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Añadido al presupuesto
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Añadir al presupuesto
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}