-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AUTONOMOS', 'SOCIEDADES', 'LABORAL', 'TRIMESTRES')),
  summary TEXT,
  price_note TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  services_slugs TEXT[] NOT NULL,
  services_titles TEXT[] NOT NULL,
  notes TEXT
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Allow anonymous read published services" ON public.services
  FOR SELECT TO anon
  USING (is_published = true);

CREATE POLICY "Allow authenticated read all services" ON public.services
  FOR SELECT TO authenticated
  USING (true);

-- RLS Policies for orders
CREATE POLICY "Allow anonymous insert orders" ON public.orders
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read orders" ON public.orders
  FOR SELECT TO authenticated
  USING (true);

-- Seed data for services
INSERT INTO public.services (slug, title, category, summary, price_note, is_published) VALUES
  ('alta-baja-autonomo', 'Alta/Baja autónomo (24/48h – CIRCE o por separado)', 'AUTONOMOS', 'Tramitación de alta o baja en 24/48h por CIRCE o AEAT.', '150 €', true),
  ('baja-autonomos-modelo-347', 'Baja autónomos (modelo 347, más de 5 perceptores)', 'AUTONOMOS', 'Baja contemplando obligaciones del modelo 347.', '100 €', true),
  ('alta-express', 'Alta Express (mismo día, obligatorio NAF + Certificado digital)', 'AUTONOMOS', 'Alta de autónomo en el mismo día con NAF y certificado.', '200 €', true),
  ('alta-roi-autonomo', 'Alta en ROI', 'AUTONOMOS', 'Registro de operador intracomunitario (VIES).', '150 €', true),
  ('alta-baja-trimestre-10', 'Alta + Baja + Trimestre (hasta 10 facturas)', 'AUTONOMOS', 'Paquete: alta, baja y presentación trimestral (≤10 fact.).', '250 €', true),
  ('alta-baja-trimestre-anual-10', 'Alta + Baja + Trimestre + Resumen anual (hasta 10 facturas)', 'AUTONOMOS', 'Incluye resumen anual adicional (≤10 fact.).', '325 €', true),
  ('consultoria-1h-autonomos', 'Consultoría (1 hora aprox.)', 'AUTONOMOS', 'Asesoramiento fiscal puntual por 1 hora.', '60 €', true),
  ('factura-electronica-openges-autonomos', 'Factura electrónica clientes OpenGes (puntual)', 'AUTONOMOS', 'Emisión puntual de factura e-factura para OpenGes.', '75 €', true),
  ('modelo-233-autonomos', 'Modelo 233 (guarderías, anual)', 'AUTONOMOS', 'Declaración informativa anual de gastos guardería.', '200 € + 50 € cada +50 perceptores', true),
  ('modelo-151-autonomos', 'Modelo 151', 'AUTONOMOS', 'IRPF especial (según caso).', '150 € + presupuesto (≈400 € total)', true),
  ('modelo-720-autonomos', 'Modelo 720', 'AUTONOMOS', 'Bienes y derechos en el extranjero.', '150 € + presupuesto (≈400 € total)', true),
  ('modelo-721-autonomos', 'Modelo 721', 'AUTONOMOS', 'Criptoactivos en el extranjero (con plantilla).', '300 €', true),
  ('modelo-210-autonomos', 'Modelo 210', 'AUTONOMOS', 'No residentes: rendimientos/ganancias en España.', '150 € + presupuesto', true),
  ('certificado-digital-autonomos', 'Certificado digital', 'AUTONOMOS', 'Solicitud y emisión de certificado digital.', '60 €', true),
  ('facturas-extras-autonomos', 'Facturas extras para contabilidad (PDF/Excel)', 'AUTONOMOS', 'Procesado adicional fuera del paquete estándar.', 'PDF 1 € / Excel 0,50 €', true),
  ('requerimientos-aeat-autonomos', 'Requerimientos AEAT (consultar con coordinador)', 'AUTONOMOS', 'Análisis y contestación a requerimientos AEAT.', 'desde 150 €', true),
  ('modelo-035-036-autonomos', 'Modelo 035/036', 'AUTONOMOS', 'Declaración censal: alta, modificación o baja.', '90 €', true),
  ('modelo-840-autonomos', 'Modelo 840', 'AUTONOMOS', 'Impuesto sobre Actividades Económicas (IAE).', '100 €', true),
  ('modelo-952-autonomos', 'Modelo 952 + adjuntar documentación', 'AUTONOMOS', 'Trámite con documentación anexa según requisitos.', '99,95 €', true),

  ('activar-inactivar-solo-aeat', 'Activar o inactivar sociedad solo AEAT', 'SOCIEDADES', 'Alta/baja en AEAT sin cambios registrales.', '175 €', true),
  ('impuesto-sociedades', 'Impuesto de Sociedades (elaboración + presentación)', 'SOCIEDADES', 'Cálculo, confección y presentación del IS.', '275 € + presupuesto', true),
  ('cuentas-anuales', 'Elaboración cuentas anuales + presentación', 'SOCIEDADES', 'Preparación y depósito de cuentas anuales.', '495 € + presupuesto', true),
  ('libros-oficiales', 'Elaboración de libros + presentación', 'SOCIEDADES', 'Legalización y presentación de libros obligatorios.', '335 € + presupuesto', true),
  ('cuentas-y-libros-pack', 'Elaboración cuentas anuales + elaboración de libros + presentación', 'SOCIEDADES', 'Pack combinado de cuentas y libros con presentación.', '695 € + presupuesto', true),
  ('balance-cuentas', 'Balance de cuentas', 'SOCIEDADES', 'Balance y situación contable.', '150 € + presupuesto', true),
  ('cierre-contable', 'Cierre contable', 'SOCIEDADES', 'Cierre y ajustes de fin de ejercicio.', '300 € + presupuesto', true),
  ('consultoria-1h-sociedades', 'Consultoría (1 hora aprox)', 'SOCIEDADES', 'Asesoramiento fiscal/contable por 1 hora.', '60 €', true),
  ('factura-electronica-openges-sociedades', 'Factura electrónica clientes OpenGes (puntual)', 'SOCIEDADES', 'Emisión puntual de e-factura para OpenGes.', '50 €', true),
  ('modelo-233-sociedades', 'Modelo 233 (guarderías)', 'SOCIEDADES', 'Informativa anual (hasta 100 perceptores).', '200 € + 50 € (+50 adic.)', true),
  ('modelo-165', 'Modelo 165', 'SOCIEDADES', 'Dividendos/distribución de beneficios.', '100 € (hasta 3 socios) + 30 € por socio extra', true),
  ('modelo-232', 'Modelo 232', 'SOCIEDADES', 'Operaciones vinculadas y paraísos fiscales.', '150 €', true),
  ('certificado-digital-sociedades', 'Certificado digital', 'SOCIEDADES', 'Certificado digital para sociedad.', '90 €', true),
  ('facturas-extras-sociedades', 'Facturas extras para contabilidad (PDF/Excel)', 'SOCIEDADES', 'Procesado adicional fuera de paquete estándar.', 'PDF 1 € / Excel 0,50 €', true),
  ('requerimientos-aeat-sociedades', 'Requerimientos AEAT (consultar con coordinador)', 'SOCIEDADES', 'Contestación a requerimientos o propuestas.', 'desde 150 €', true),
  ('modelo-035-036-sociedades', 'Modelo 035/036', 'SOCIEDADES', 'Declaración censal: altas, bajas, modificaciones.', '90 €', true),
  ('modelo-036-inicio-cese', 'Modelo 036 inicio / cese actividad', 'SOCIEDADES', 'Altas o ceses censales ante AEAT.', '90 €', true),
  ('solicitud-nif-n', 'Solicitud NIF "N" establecimiento no permanente', 'SOCIEDADES', 'NIF para EP no residente.', '200 €', true),
  ('diligencia-embargo-creditos', 'Diligencia de embargo de créditos (contestación)', 'SOCIEDADES', 'Atención a diligencias de embargo.', '40 €', true),
  ('cartas-pago-nrc', 'Cartas de pago/pago NRC en AEAT', 'SOCIEDADES', 'Generación de NRC, providencias y pagos varios.', '20 €', true),
  ('autoliquidaciones-complementarias', 'Autoliquidaciones complementarias por error del cliente', 'SOCIEDADES', 'Regularización de autoliquidaciones erróneas.', 'presupuesto', true),
  ('complementaria-trimestral-anual-iva', 'Autoliquidación trimestral complementaria + resumen anual IVA por error del cliente', 'SOCIEDADES', 'Regularización de IVA trimestral y anual.', '75 €', true),
  ('certificados-aeat-tgss', 'Certificados AEAT/TGSS', 'SOCIEDADES', 'Solicitud de certificados tributarios y SS.', '20 €', true),
  ('req-renta-iva-sociedades', 'Requerimiento renta/IVA/sociedades (aportar facturas ordenadas)', 'SOCIEDADES', 'Preparación de documentación y respuesta.', '80 € + presupuesto', true),
  ('alegaciones-requerimientos', 'Alegaciones requerimientos/propuestas de liquidación renta/IVA/sociedades', 'SOCIEDADES', 'Escritos de alegaciones según expediente.', 'desde 150 €', true),
  ('alta-roi-sociedades', 'Alta ROI', 'SOCIEDADES', 'Alta en Registro de Operadores Intracomunitarios.', 'desde 150 €', true),
  ('levantamiento-embargo', 'Levantamiento de embargo/aportación pago de deudas', 'SOCIEDADES', 'Gestión de pagos y levantamientos.', '60 €', true),
  ('modelo-840-sociedades', 'Modelo 840', 'SOCIEDADES', 'Gestión del IAE para sociedades.', '100 €', true),
  ('modelo-952-sociedades', 'Modelo 952 + adjuntar documentación', 'SOCIEDADES', 'Trámite con tasas registrales.', '99,95 € + tasas RM', true),
  ('titular-real', 'Identificación titular real', 'SOCIEDADES', 'Declaración de titularidad real.', '99,95 € + tasas RM', true),
  ('cancelacion-prorroga-tarifa-plana', 'Cancelación prórroga tarifa plana + comunicación base y rendimientos', 'SOCIEDADES', 'Gestión de bonificaciones y bases.', '19,95 €', true),
  ('cambio-bases-cotizacion', 'Cambio de bases cotización RETA (primer cambio gratis)', 'SOCIEDADES', 'Modificación de base de cotización.', '19,95 €', true),
  ('aplazamientos-tgss-aeat', 'Aplazamientos en TGSS/AEAT', 'SOCIEDADES', 'Tramitación de aplazamientos de deuda.', '295 € + presupuesto', true),
  ('aplazamientos-ss-reta-sepe', 'Aplazamientos en SS para RETA o SEPE', 'SOCIEDADES', 'Gestión de aplazamientos en SS o SEPE.', '250 € + presupuesto', true),

  ('alta-tgss-contrato-sepe', 'Alta TGSS, contrato y SEPE', 'LABORAL', 'Alta en TGSS, contrato y comunicación SEPE.', '19,95 €', true),
  ('extincion-contratos', 'Extinción contratos: baja voluntaria, periodo prueba o fin de contrato', 'LABORAL', 'Tramitación de extinción.', '19,95 €', true),
  ('modificacion-condiciones', 'Modificación condiciones contractuales', 'LABORAL', 'Variación de jornada, salario, cláusulas.', '14,95 €', true),
  ('despido-trabajadores', 'Despido de trabajadores', 'LABORAL', 'Cálculo y documentación para despido.', '79,95 €', true),
  ('calculo-indemnizacion', 'Cálculo indemnización despido (solo cálculo)', 'LABORAL', 'Cálculo de indemnización; finiquito aparte.', '30 €', true),
  ('deltas-trabajadores', 'Deltas de trabajadores', 'LABORAL', 'Variaciones de datos de trabajadores en TGSS.', '19,95 €', true),
  ('modificaciones-nominas', 'Modificaciones nóminas', 'LABORAL', 'Ajustes puntuales de nóminas.', '50 % del coste', true),
  ('nominas-puntuales', 'Nóminas puntuales', 'LABORAL', 'Emisión puntual de nóminas y seguros sociales.', '60 €', true),
  ('precontrato-t300', 'Precontrato - T300', 'LABORAL', 'Preparación de precontrato T300.', '150 €', true),
  ('subrogacion-ccc', 'Subrogación C.C.C.', 'LABORAL', 'Cambio de código cuenta cotización.', '150 €', true),
  ('subrogacion-empleado', 'Subrogación empleado', 'LABORAL', 'Traspaso de empleado entre empresas.', '150 €', true),
  ('deltas-autonomos-sin-nomina', 'Deltas de autónomos sin nómina', 'LABORAL', 'Variaciones de datos RETA sin nómina mensual.', '150 €', true),
  ('simulaciones-costes-o-despido', 'Simulaciones costes o despido (indemnización)', 'LABORAL', 'Estimación de costes e indemnizaciones.', '150 €', true),
  ('pago-directo-autonomo-it', 'Pago directo autónomo por baja IT', 'LABORAL', 'Gestión de prestación por IT.', '150 €', true),
  ('alta-baja-autonomo-laboral', 'Alta/baja autónomo y cambio condición autónomo', 'LABORAL', 'Altas, bajas y cambios en RETA.', '150 €', true),
  ('modificaciones-autonomos-laboral', 'Modificaciones autónomos', 'LABORAL', 'Cambios de domicilio, actividad, bases.', '100 €', true),
  ('maternidad-paternidad', 'Maternidad/paternidad', 'LABORAL', 'Tramitación de prestaciones por nacimiento/cuidado.', '175 €', true),
  ('cambios-datos-empresa', 'Cambios datos empresa', 'LABORAL', 'Modificación de datos de empresa ante TGSS.', '150 €', true),
  ('teletrabajo-alta-direccion', 'Acuerdo de teletrabajo y contratos alta dirección-mercantil', 'LABORAL', 'Redacción de acuerdos y contratos especiales.', '150 €', true),
  ('contestacion-embargos', 'Contestación embargos', 'LABORAL', 'Contestación a embargos y apremios.', '15 €', true),
  ('ccc-hogar-sin-nomina', 'CCC empleada de hogar + alta sin nómina mensual', 'LABORAL', 'Alta y CCC (sin nómina mensual).', '100 €', true),
  ('ccc-hogar-con-nomina', 'CCC empleada de hogar + alta con nómina mensual', 'LABORAL', 'Alta y CCC con nómina mensual.', '70 €', true),
  ('obtencion-ccc-comunicar-centro', 'Obtención CCC / comunicar centro de trabajo', 'LABORAL', 'Alta de CCC o comunicación de centro.', '30 € - 49,95 €', true),
  ('devolucion-ingresos-indebidos', 'Devolución de ingresos indebidos', 'LABORAL', 'Solicitud de devolución por pagos indebidos.', '30 €', true),
  ('carta-pago-flc-ss', 'Carta de pago FLC - Seg sociales', 'LABORAL', 'Generación de carta de pago FLC/SS.', '15 €', true),
  ('baja-voluntaria-fijos-discontinuos', 'Comunicación baja voluntaria fijos discontinuos', 'LABORAL', 'Comunicación y documentación.', '20 €', true),
  ('alta-o-nif-sustitutorio-naf', 'Solicitud alta o NIF sustitutorio NAF', 'LABORAL', 'Gestión de alta o NAF sustitutorio.', '30 €', true),
  ('nominas-trabajadores-y-remesa', 'Nóminas trabajadores y remesa', 'LABORAL', 'Emisión de nóminas y remesa SS.', '20 €', true),
  ('empresas-ordinarias-especiales-rea', 'Empresas ordinarias especiales (REA)', 'LABORAL', 'Tramitación ante REA.', '300 €', true),
  ('informes-sistema-red', 'Informes solicitud sistema RED', 'LABORAL', 'Generación de informes del Sistema RED.', '10 €', true),
  ('contestacion-aval-altas-bajas', 'Contestación aval/altas/bajas', 'LABORAL', 'Contestaciones a comunicaciones varias.', '14,95 €', true),
  ('tramites-urgentes', 'Trámites urgentes (altas/bajas/finiquitos)', 'LABORAL', 'Tramitación urgente con recargo del 50%.', '50 % más del trámite', true),

  ('trimestre-0-5-facturas', 'Elaboración y presentación de trimestre (<5 facturas)', 'TRIMESTRES', 'Trimestral con menos de 5 facturas.', '100 €', true),
  ('trimestre-6-20-facturas', 'Elaboración y presentación de trimestre (6–20 facturas)', 'TRIMESTRES', 'Trimestral con 6 a 20 facturas.', '150 €', true),
  ('trimestre-21-50-facturas', 'Elaboración y presentación de trimestre (21–50 facturas)', 'TRIMESTRES', 'Trimestral con 21 a 50 facturas.', '200 €', true),
  ('trimestre-mas-50-facturas', 'Elaboración y presentación de trimestre (>50 facturas)', 'TRIMESTRES', 'Trimestral con más de 50 facturas (recargo por fichero).', '200 € (+0,50 € Excel / 1,00 € PDF)', true),
  ('modelo-trimestral-adicional', 'Modelo trimestral adicional', 'TRIMESTRES', 'Modelo adicional en el mismo período.', '100 €', true),
  ('modelo-anual', 'Modelo anual', 'TRIMESTRES', 'Resumen anual de IVA/IRPF.', '150 €', true),
  ('iva-alquiler-local', 'Modelo IVA por alquiler local (salvo 4T – enero 90)', 'TRIMESTRES', 'Liquidación de IVA por alquiler de local.', '100 € + IVA', true)
ON CONFLICT (slug) DO NOTHING;