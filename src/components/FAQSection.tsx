import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Es seguro subir mis documentos?",
      answer: "Absolutamente. Utilizamos cifrado AES-256 de grado militar, el mismo que usan los bancos. Todos tus documentos están protegidos bajo RGPD y solo tu asesor personal asignado tiene acceso a ellos. Además, todos nuestros servidores están ubicados en la UE."
    },
    {
      question: "¿Quién me atiende? ¿Es real?",
      answer: "Te atiende un asesor fiscal certificado con experiencia real. Cada cliente tiene asignado un asesor personal que conoce tu caso específico. Puedes comunicarte directamente con él/ella a través de nuestra plataforma o por teléfono."
    },
    {
      question: "¿Qué documentos tengo que enviar?",
      answer: "Dependiendo de tu situación, pero generalmente necesitamos: certificado de retenciones del trabajo, facturas de gastos deducibles, documentos de inversiones, gastos médicos, donativos, y cualquier otro documento fiscal relevante. Te enviamos una lista personalizada según tu perfil."
    },
    {
      question: "¿Qué pasa si tengo dudas?",
      answer: "Tu asesor personal está disponible para resolver todas tus dudas. Puedes contactarlo directamente a través de nuestra plataforma, por email o teléfono. Además, recibes explicaciones detalladas de cada punto de tu declaración."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Resolvemos las dudas más comunes sobre nuestro servicio
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-card"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            ¿Tienes más preguntas?
          </p>
          <Button
            variant="cta"
            size="xl"
            onClick={() => window.open("https://tally.so/r/31QNWg", "_blank")}
          >
            Empezar ahora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;