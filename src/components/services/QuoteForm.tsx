import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from '@/contexts/CartContext';
import { submitQuoteRequest, QuoteRequestItem } from '@/lib/supabase';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';

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
    
    if (!validateForm()) return;
    if (state.items.length === 0) return;
    
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

  const isFormValid = state.items.length > 0 && 
                     formData.fullName.trim().split(' ').filter(part => part.length > 0).length >= 2 &&
                     validateEmail(formData.email) &&
                     formData.clientType !== '';

  if (submitStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
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
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Solicitar Presupuesto
        </CardTitle>
        <CardDescription>
          Completa tus datos para recibir un presupuesto personalizado por email
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {submitStatus === 'error' && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage || 'Ha ocurrido un error al enviar tu solicitud. Por favor, inténtalo de nuevo.'}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Cart Summary */}
          {state.items.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Resumen de servicios:</h4>
              <div className="space-y-1">
                {state.items.map((item, index) => (
                  <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                    <span>{item.service.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="text-sm font-medium flex justify-between">
                  <span>Total servicios:</span>
                  <span>{state.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isSubmitting}
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
              </>
            )}
          </Button>

          {!isFormValid && state.items.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              Añade al menos un servicio al carrito para continuar
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}