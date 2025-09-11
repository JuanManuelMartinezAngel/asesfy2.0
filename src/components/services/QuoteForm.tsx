import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from '@/contexts/CartContext';
import { submitQuoteRequest, QuoteRequestItem } from '@/lib/supabase';
import { Loader2, CheckCircle, AlertCircle, Send, ShoppingCart } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  clientType: 'autonomo' | 'pyme' | '';
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  clientType?: string;
}

export default function QuoteForm() {
  const { state, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    clientType: '',
    notes: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  // Recalculate validation whenever form data or cart changes
  useEffect(() => {
    const hasItems = state.items.length > 0;
    const nameParts = formData.fullName.trim().split(' ').filter(part => part.length > 0);
    const isNameValid = nameParts.length >= 2;
    const isEmailValid = formData.email.length > 0 && validateEmail(formData.email);
    const isClientTypeValid = formData.clientType !== '';
    
    const formIsValid = isNameValid && isEmailValid && isClientTypeValid;
    const allValid = hasItems && formIsValid;
    
    setIsFormValid(allValid);
    
    // Set validation message
    if (!hasItems && !formIsValid) {
      setValidationMessage('Añade servicios al carrito y completa tus datos para continuar');
    } else if (!hasItems) {
      setValidationMessage('Añade al menos un servicio al carrito para continuar');
    } else if (!formIsValid) {
      if (!isNameValid) {
        setValidationMessage('Introduce tu nombre completo (nombre y apellido)');
      } else if (!isEmailValid) {
        setValidationMessage('Introduce un email válido');
      } else if (!isClientTypeValid) {
        setValidationMessage('Selecciona tu tipo de cliente');
      }
    } else {
      setValidationMessage('');
    }
    
    console.log('Validation check:', {
      hasItems,
      isNameValid,
      isEmailValid,
      isClientTypeValid,
      formIsValid,
      allValid,
      formData
    });
  }, [formData, state.items]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate full name (at least 2 words)
    const nameParts = formData.fullName.trim().split(' ').filter(part => part.length > 0);
    if (nameParts.length < 2) {
      newErrors.fullName = 'Por favor, introduce tu nombre completo (nombre y apellido)';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, introduce un email válido';
    }
    
    // Validate client type
    if (!formData.clientType) {
      newErrors.clientType = 'Por favor, selecciona el tipo de cliente';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted!', { formData, cartItems: state.items });
    
    // Basic validation
    if (state.items.length === 0) {
      alert('Por favor, añade al menos un servicio al carrito');
      return;
    }
    
    if (!formData.fullName.trim()) {
      alert('Por favor, introduce tu nombre completo');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('Por favor, introduce tu email');
      return;
    }
    
    if (!formData.clientType) {
      alert('Por favor, selecciona tu tipo de cliente');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Prepare items for submission
      const items: QuoteRequestItem[] = state.items.map(item => ({
        service_code: item.service.code,
        service_name: item.service.name,
        quantity: item.quantity,
        details: Object.keys(item.details).length > 0 ? item.details : undefined
      }));
      
      console.log('Submitting to Supabase:', {
        p_email: formData.email,
        p_full_name: formData.fullName,
        p_client_type: formData.clientType,
        p_notes: formData.notes || undefined,
        p_items: items
      });
      
      // Submit quote request
      await submitQuoteRequest({
        p_email: formData.email,
        p_full_name: formData.fullName,
        p_client_type: formData.clientType as 'autonomo' | 'pyme',
        p_notes: formData.notes || undefined,
        p_items: items
      });
      
      setSubmitStatus('success');
      
      // Reset form and cart after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          clientType: '',
          notes: ''
        });
        clearCart();
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar la solicitud');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="h-full flex flex-col">
        <Card className="border-green-200 bg-green-50 flex-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ¡Listo! Hemos recibido tu solicitud
              </h3>
              <p className="text-green-700">
                Te enviaremos un presupuesto por correo electrónico en las próximas horas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Submit Button Section - Always visible at top */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Solicitar Presupuesto
          </CardTitle>
          <CardDescription>
            Completa tus datos para recibir un presupuesto personalizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleSubmit}
            className={`w-full ${
              state.items.length > 0 
                ? 'bg-primary hover:bg-primary/90' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando solicitud...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Solicitar presupuesto
                {state.items.length > 0 && (
                  <span className="ml-2 bg-white bg-opacity-30 rounded-full px-3 py-1 text-xs font-semibold">
                    {state.items.length} servicio{state.items.length !== 1 ? 's' : ''}
                  </span>
                )}
              </>
            )}
          </Button>
          
          {/* Status indicator */}
          {state.items.length > 0 ? (
            <p className="text-center text-sm text-green-600 mt-2 font-medium">
              ✓ {state.items.reduce((sum, item) => sum + item.quantity, 0)} servicios listos para cotizar
            </p>
          ) : (
            <p className="text-center text-sm text-gray-500 mt-2">
              Añade servicios al carrito para continuar
            </p>
          )}
          
          {/* Validation Message */}
          {!isFormValid && validationMessage && state.items.length > 0 && (
            <Alert variant="destructive" className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {validationMessage}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Form Section - Separate card for better usability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tus Datos</CardTitle>
          <CardDescription>
            Rellena la información para recibir tu presupuesto
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitStatus === 'error' && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage || 'Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">
                Nombre completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ej: Juan Pérez García"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Client Type */}
            <div>
              <Label htmlFor="clientType">
                Tipo de cliente <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.clientType}
                onValueChange={(value) => handleInputChange('clientType', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className={errors.clientType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecciona tu tipo de cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autonomo">Autónomo</SelectItem>
                  <SelectItem value="pyme">Pyme</SelectItem>
                </SelectContent>
              </Select>
              {errors.clientType && (
                <p className="text-red-500 text-sm mt-1">{errors.clientType}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notas generales (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Cualquier información adicional que consideres relevante..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cart Summary - Separate card */}
      {state.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Servicios Seleccionados ({state.items.reduce((sum, item) => sum + item.quantity, 0)})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <span className="flex-1 pr-2 font-medium">{item.service.name}</span>
                  <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Debug info */}
      <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
        Debug: Carrito: {state.items.length}, Nombre: "{formData.fullName}", Email: "{formData.email}", Tipo: "{formData.clientType}"
      </div>
    </div>
  );
}