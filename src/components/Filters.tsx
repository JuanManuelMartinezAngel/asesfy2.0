import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FiltersProps {
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
  onClearFilters: () => void
}

const CATEGORIES = [
  { value: 'AUTONOMOS', label: 'Autónomos', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' },
  { value: 'SOCIEDADES', label: 'Sociedades', color: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' },
  { value: 'LABORAL', label: 'Laboral', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200' },
  { value: 'TRIMESTRES', label: 'Trimestres', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200' }
]

export function Filters({ selectedCategories, onCategoryToggle, onClearFilters }: FiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Filtrar por categoría</h3>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs h-8"
          >
            <X className="w-3 h-3 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.value)
          
          return (
            <Badge
              key={category.value}
              variant={isSelected ? "default" : "secondary"}
              className={`cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : category.color
              }`}
              onClick={() => onCategoryToggle(category.value)}
            >
              {category.label}
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}