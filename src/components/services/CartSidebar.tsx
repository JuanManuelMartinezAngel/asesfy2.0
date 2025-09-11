import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart, CartItem } from '@/contexts/CartContext';
import { ShoppingCart, X, Edit2, Trash2, Plus, Minus } from 'lucide-react';
import AddServiceModal from './AddServiceModal';

export default function CartSidebar() {
  const { state, removeItem, updateItem, clearCart, closeCart } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditItem = (item: CartItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItem(item.id, newQuantity, item.details);
  };

  const formatDetails = (details: Record<string, any>) => {
    const entries = Object.entries(details).filter(([key, value]) => 
      value !== '' && value !== null && value !== undefined
    );
    
    if (entries.length === 0) return null;
    
    return entries.map(([key, value]) => `${key}: ${value}`).join(', ');
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

  if (!state.isOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <Button
          onClick={() => closeCart()}
          size="lg"
          className="rounded-full shadow-lg relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {state.items.length}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="font-semibold">Carrito</h2>
            {state.items.length > 0 && (
              <Badge variant="secondary">
                {state.items.length} servicio{state.items.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={closeCart}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 text-sm">
                Añade servicios para solicitar un presupuesto
              </p>
            </div>
          ) : (
            <ScrollArea className="h-full p-4">
              <div className="space-y-3">
                {state.items.map((item) => (
                  <Card key={item.id} className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">
                              {getCategoryIcon(item.service.category)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {item.service.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-medium leading-tight">
                            {item.service.name}
                          </CardTitle>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Quantity controls */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Cantidad:</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Details */}
                      {formatDetails(item.details) && (
                        <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="font-medium">Detalles:</span> {formatDetails(item.details)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Total de servicios:</span>
              <span className="font-semibold">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar carrito
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Completa el formulario para solicitar tu presupuesto
                </p>
                <Button onClick={closeCart} className="w-full">
                  Continuar con el presupuesto
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <AddServiceModal
          service={editingItem.service}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          editingItem={editingItem}
        />
      )}
    </>
  );
}