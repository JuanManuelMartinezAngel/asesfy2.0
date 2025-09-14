import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Service } from '@/data/services';
import { useCart, CartItem } from '@/contexts/CartContext';
import { Plus, Minus } from 'lucide-react';

interface AddServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  editingItem?: CartItem | null;
}

export default function AddServiceModal({ service, isOpen, onClose, editingItem }: AddServiceModalProps) {
  const { addItem, updateItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (service) {
      if (editingItem) {
        // Initialize with existing item data
        setDetails(editingItem.details);
        setQuantity(editingItem.quantity);
      } else {
        // Initialize details with empty values
        const initialDetails: Record<string, any> = {};
        service.details?.forEach(detail => {
          initialDetails[detail.field] = '';
        });
        setDetails(initialDetails);
        setQuantity(1);
      }
      setErrors({});
    }
  }, [service, editingItem]);

  const handleDetailChange = (field: string, value: string | number) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!service) return false;
    
    // Validate required details
    service.details?.forEach(detail => {
      if (detail.required && (!details[detail.field] || details[detail.field] === '')) {
        newErrors[detail.field] = `${detail.label} es obligatorio`;
      }
      
      // Validate number fields
      if (detail.type === 'number' && details[detail.field] && isNaN(Number(details[detail.field]))) {
        newErrors[detail.field] = `${detail.label} debe ser un número válido`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!service || !validateForm()) return;
    
    if (editingItem) {
      updateItem(editingItem.id, quantity, details);
    } else {
      addItem(service, quantity, details);
    }
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Editar servicio' : 'Añadir servicio'}
          </DialogTitle>
          <DialogDescription>
            {service.name}
            {service.description && ` - ${service.description}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
                min="1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Service-specific details */}
          {service.details?.map((detail) => (
            <div key={detail.field}>
              <Label htmlFor={detail.field}>
                {detail.label}
                {detail.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              
              {detail.type === 'textarea' ? (
                <Textarea
                  id={detail.field}
                  placeholder={detail.placeholder}
                  value={details[detail.field] || ''}
                  onChange={(e) => handleDetailChange(detail.field, e.target.value)}
                  className={`mt-1 ${errors[detail.field] ? 'border-red-500' : ''}`}
                  rows={3}
                />
              ) : (
                <Input
                  id={detail.field}
                  type={detail.type}
                  placeholder={detail.placeholder}
                  value={details[detail.field] || ''}
                  onChange={(e) => handleDetailChange(
                    detail.field, 
                    detail.type === 'number' ? e.target.value : e.target.value
                  )}
                  className={`mt-1 ${errors[detail.field] ? 'border-red-500' : ''}`}
                />
              )}
              
              {errors[detail.field] && (
                <p className="text-red-500 text-sm mt-1">{errors[detail.field]}</p>
              )}
            </div>
          ))}

          {/* General notes */}
          <div>
            <Label htmlFor="notes">Observaciones adicionales (opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Cualquier detalle adicional que consideres importante..."
              value={details.comentarios || ''}
              onChange={(e) => handleDetailChange('comentarios', e.target.value)}
              className="mt-1"
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {editingItem ? 'Actualizar' : 'Añadir al carrito'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}