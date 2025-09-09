import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { RequestModal } from './RequestModal'

export function Cart() {
  const { cart, removeFromCart, cartCount } = useCart()
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleRequestQuote = () => {
    setIsCartOpen(false)
    setIsRequestModalOpen(true)
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Servicios Seleccionados</SheetTitle>
            <SheetDescription>
              Revisa los servicios que has añadido a tu presupuesto
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay servicios en tu carrito</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.slug} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.slug)}
                      className="ml-2 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <Button 
                    onClick={handleRequestQuote}
                    className="w-full"
                    disabled={cart.length === 0}
                  >
                    Solicitar presupuesto
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <RequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  )
}