import React from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
import { categories } from '@/data/services';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  onClearFilters: () => void;
}

export default function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  onClearFilters
}: SearchAndFiltersProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AUTÓNOMOS': return '🧾';
      case 'SOCIEDADES': return '🏢';
      case 'LABORAL': return '👥';
      case 'TRIMESTRE': return '📊';
      default: return '📋';
    }
  };

  const hasActiveFilters = searchTerm.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar servicios por nombre..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Categorías</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs h-6 px-2 text-gray-500 hover:text-gray-700"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Badge
                key={category}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategoryToggle(category)}
              >
                <span className="mr-1">{getCategoryIcon(category)}</span>
                {category}
              </Badge>
            );
          })}
        </div>
        
        {selectedCategories.length > 0 && (
          <p className="text-xs text-gray-500">
            {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''} seleccionada{selectedCategories.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <span className="font-medium">Filtros activos:</span>
          {searchTerm && (
            <Badge variant="secondary" className="text-xs">
              Búsqueda: "{searchTerm}"
            </Badge>
          )}
          {selectedCategories.map(category => (
            <Badge key={category} variant="secondary" className="text-xs">
              {getCategoryIcon(category)} {category}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}