export interface ServiceDetail {
  field: string;
  label: string;
  type: 'number' | 'text' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

export interface Service {
  code: string;
  name: string;
  category: 'AUTÓNOMOS' | 'SOCIEDADES' | 'LABORAL' | 'TRIMESTRE';
  description?: string;
  details?: ServiceDetail[];
}

export const services: Service[] = [
  // AUTÓNOMOS
  {
    code: 'aut_alta_baja_24_48h',
    name: 'Alta/Baja autónomo (24/48h – CIRCE o por separado)',
    category: 'AUTÓNOMOS',
    description: 'Gestión completa de alta y baja de autónomo en 24-48 horas'
  },
  {
    code: 'aut_baja_347',
    name: 'Baja autónomos (modelo 347, más de 5 perceptores)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'perceptores', label: 'Número de perceptores', type: 'number', required: true, placeholder: 'Ej: 120' }
    ]
  },
  {
    code: 'aut_alta_express',
    name: 'Alta Express (mismo día, obligatorio NAF + Certificado digital)',
    category: 'AUTÓNOMOS',
    description: 'Alta de autónomo en el mismo día con NAF y certificado digital obligatorios'
  },
  {
    code: 'aut_alta_roi',
    name: 'Alta en ROI',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_alta_baja_trimestre_10',
    name: 'Alta + Baja + Trimestre (hasta 10 facturas)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Máximo 10' }
    ]
  },
  {
    code: 'aut_alta_baja_trimestre_resumen_10',
    name: 'Alta + Baja + Trimestre + Resumen anual (hasta 10 facturas)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Máximo 10' }
    ]
  },
  {
    code: 'aut_consultoria_1h',
    name: 'Consultoría (1 hora aprox.)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'tema', label: 'Tema de consulta', type: 'textarea', required: true, placeholder: 'Describe brevemente el tema a consultar' }
    ]
  },
  {
    code: 'aut_factura_electronica_openges',
    name: 'Factura electrónica clientes OpenGes (puntual)',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_233',
    name: 'Modelo 233 (guarderías, anual)',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_151',
    name: 'Modelo 151',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_720',
    name: 'Modelo 720',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_721',
    name: 'Modelo 721',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_210',
    name: 'Modelo 210',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_certificado_digital',
    name: 'Certificado digital',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_facturas_extras',
    name: 'Facturas extras para contabilidad (PDF / Excel)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'cantidad', label: 'Cantidad de facturas', type: 'number', required: true }
    ]
  },
  {
    code: 'aut_requerimientos_aeat',
    name: 'Requerimientos AEAT (consultar con coordinador)',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'detalles', label: 'Detalles del requerimiento', type: 'textarea', required: true }
    ]
  },
  {
    code: 'aut_modelo_035_036',
    name: 'Modelo 035/036',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_840',
    name: 'Modelo 840',
    category: 'AUTÓNOMOS'
  },
  {
    code: 'aut_modelo_952',
    name: 'Modelo 952 + adjuntar documentación',
    category: 'AUTÓNOMOS',
    details: [
      { field: 'documentacion', label: 'Descripción de documentación', type: 'textarea', required: true }
    ]
  },

  // SOCIEDADES
  {
    code: 'soc_activar_inactivar',
    name: 'Activar o inactivar sociedad solo AEAT',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_impuesto_sociedades',
    name: 'Impuesto de Sociedades (elaboración + presentación)',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cuentas_anuales',
    name: 'Elaboración cuentas anuales + presentación',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_libros',
    name: 'Elaboración de libros + presentación',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cuentas_libros',
    name: 'Elaboración cuentas anuales + elaboración de libros + presentación',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_balance_cuentas',
    name: 'Balance de cuentas',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cierre_contable',
    name: 'Cierre contable',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_consultoria_1h',
    name: 'Consultoría (1 hora aprox.)',
    category: 'SOCIEDADES',
    details: [
      { field: 'tema', label: 'Tema de consulta', type: 'textarea', required: true, placeholder: 'Describe brevemente el tema a consultar' }
    ]
  },
  {
    code: 'soc_factura_electronica_openges',
    name: 'Factura electrónica clientes OpenGes (puntual)',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_233',
    name: 'Modelo 233 (guarderías)',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_165',
    name: 'Modelo 165',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_232',
    name: 'Modelo 232',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_certificado_digital',
    name: 'Certificado digital',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_facturas_extras',
    name: 'Facturas extras para contabilidad (PDF / Excel)',
    category: 'SOCIEDADES',
    details: [
      { field: 'cantidad', label: 'Cantidad de facturas', type: 'number', required: true }
    ]
  },
  {
    code: 'soc_requerimientos_aeat',
    name: 'Requerimientos AEAT (consultar con coordinador)',
    category: 'SOCIEDADES',
    details: [
      { field: 'detalles', label: 'Detalles del requerimiento', type: 'textarea', required: true }
    ]
  },
  {
    code: 'soc_modelo_035_036',
    name: 'Modelo 035/036',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_036_inicio_cese',
    name: 'Modelo 036 inicio / cese actividad',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_solicitud_nif_n',
    name: 'Solicitud NIF "N" establecimiento no permanente',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_diligencia_embargo',
    name: 'Diligencia de embargo de créditos (contestación)',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cartas_pago_nrc',
    name: 'Cartas de pago/pago NRC en AEAT',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_autoliquidaciones_complementarias',
    name: 'Autoliquidaciones complementarias por error del cliente',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_autoliquidacion_trimestral_complementaria',
    name: 'Autoliquidación trimestral complementaria + resumen anual IVA por error del cliente',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_certificados_aeat_tgss',
    name: 'Certificados AEAT/TGSS',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_requerimiento_renta_iva',
    name: 'Requerimiento renta/IVA/sociedades',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_alegaciones_requerimientos',
    name: 'Alegaciones requerimientos/propuestas de liquidación renta/IVA/sociedades',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_alta_roi',
    name: 'Alta ROI',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_levantamiento_embargo',
    name: 'Levantamiento de embargo/aportación pago de deudas',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_840',
    name: 'Modelo 840',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_modelo_952',
    name: 'Modelo 952 + adjuntar documentación',
    category: 'SOCIEDADES',
    details: [
      { field: 'documentacion', label: 'Descripción de documentación', type: 'textarea', required: true }
    ]
  },
  {
    code: 'soc_identificacion_titular_real',
    name: 'Identificación titular real',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cancelacion_prorroga_tarifa_plana',
    name: 'Cancelación prórroga tarifa plana + comunicación base y rendimientos',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_cambio_bases_cotizacion',
    name: 'Cambio de bases cotización RETA',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_aplazamientos_tgss_aeat',
    name: 'Aplazamientos en TGSS/AEAT',
    category: 'SOCIEDADES'
  },
  {
    code: 'soc_aplazamientos_ss_reta_sepe',
    name: 'Aplazamientos en SS para RETA o SEPE',
    category: 'SOCIEDADES'
  },

  // LABORAL
  {
    code: 'lab_alta_tgss_contrato_sepe',
    name: 'Alta TGSS, contrato y SEPE',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_extincion_contratos',
    name: 'Extinción contratos baja voluntaria, periodo prueba o fin de contrato',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_modificacion_condiciones',
    name: 'Modificación condiciones contractuales',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_despido_trabajadores',
    name: 'Despido de trabajadores',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_calculo_indemnizacion',
    name: 'Cálculo indemnización despido (solo cálculo)',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_deltas_trabajadores',
    name: 'Deltas de trabajadores',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_modificaciones_nominas',
    name: 'Modificaciones nóminas',
    category: 'LABORAL',
    details: [
      { field: 'nominas', label: 'Número de nóminas', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_nominas_puntuales',
    name: 'Nóminas puntuales',
    category: 'LABORAL',
    details: [
      { field: 'nominas', label: 'Número de nóminas', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_precontrato_t300',
    name: 'Precontrato - T300',
    category: 'LABORAL'
  },
  {
    code: 'lab_subrogacion_ccc',
    name: 'Subrogación C.C.C.',
    category: 'LABORAL'
  },
  {
    code: 'lab_subrogacion_empleado',
    name: 'Subrogación empleado',
    category: 'LABORAL'
  },
  {
    code: 'lab_deltas_autonomos',
    name: 'Deltas de autónomos sin nómina',
    category: 'LABORAL'
  },
  {
    code: 'lab_simulaciones',
    name: 'Simulaciones costes o despido',
    category: 'LABORAL'
  },
  {
    code: 'lab_pago_directo_autonomo',
    name: 'Pago directo autónomo por baja IT',
    category: 'LABORAL'
  },
  {
    code: 'lab_alta_baja_autonomo',
    name: 'Alta/baja autónomo y cambio condición autónomo',
    category: 'LABORAL'
  },
  {
    code: 'lab_modificaciones_autonomos',
    name: 'Modificaciones autónomos',
    category: 'LABORAL'
  },
  {
    code: 'lab_maternidad_paternidad',
    name: 'Maternidad/paternidad',
    category: 'LABORAL'
  },
  {
    code: 'lab_cambios_datos_empresa',
    name: 'Cambios datos empresa',
    category: 'LABORAL'
  },
  {
    code: 'lab_acuerdo_teletrabajo',
    name: 'Acuerdo de teletrabajo y contratos alta dirección-mercantil',
    category: 'LABORAL'
  },
  {
    code: 'lab_contestacion_embargos',
    name: 'Contestación embargos',
    category: 'LABORAL'
  },
  {
    code: 'lab_ccc_empleada_hogar_sin_nomina',
    name: 'CCC empleada de hogar + alta sin nómina mensual',
    category: 'LABORAL'
  },
  {
    code: 'lab_ccc_empleada_hogar_con_nomina',
    name: 'CCC empleada de hogar + alta con nómina mensual',
    category: 'LABORAL'
  },
  {
    code: 'lab_obtencion_ccc',
    name: 'Obtención CCC / comunicar centro de trabajo',
    category: 'LABORAL'
  },
  {
    code: 'lab_devolucion_ingresos',
    name: 'Devolución de ingresos indebidos',
    category: 'LABORAL'
  },
  {
    code: 'lab_carta_pago_flc',
    name: 'Carta de pago FLC - Seg sociales',
    category: 'LABORAL'
  },
  {
    code: 'lab_comunicacion_baja_voluntaria',
    name: 'Comunicación baja voluntaria fijos discontinuos',
    category: 'LABORAL'
  },
  {
    code: 'lab_solicitud_alta_nif',
    name: 'Solicitud alta o NIF sustitutorio NAF',
    category: 'LABORAL'
  },
  {
    code: 'lab_nominas_trabajadores_remesa',
    name: 'Nóminas trabajadores y remesa',
    category: 'LABORAL',
    details: [
      { field: 'trabajadores', label: 'Número de trabajadores', type: 'number', required: true }
    ]
  },
  {
    code: 'lab_empresas_ordinarias_especiales',
    name: 'Empresas ordinarias especiales (REA)',
    category: 'LABORAL'
  },
  {
    code: 'lab_informes_sistema_red',
    name: 'Informes solicitud sistema RED',
    category: 'LABORAL'
  },
  {
    code: 'lab_contestacion_aval',
    name: 'Contestación aval/altas/bajas',
    category: 'LABORAL'
  },
  {
    code: 'lab_tramites_urgentes',
    name: 'Trámites urgentes altas/bajas/finiquitos',
    category: 'LABORAL'
  },

  // TRIMESTRE
  {
    code: 'trim_menos_5_facturas',
    name: 'Menos de 5 facturas al trimestre',
    category: 'TRIMESTRE',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Menos de 5' }
    ]
  },
  {
    code: 'trim_6_20_facturas',
    name: 'De 6 a 20 facturas al trimestre',
    category: 'TRIMESTRE',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Entre 6 y 20' }
    ]
  },
  {
    code: 'trim_21_50_facturas',
    name: 'De 21 a 50 facturas al trimestre',
    category: 'TRIMESTRE',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Entre 21 y 50' }
    ]
  },
  {
    code: 'trim_mas_50_facturas',
    name: 'Más de 50 facturas al trimestre',
    category: 'TRIMESTRE',
    details: [
      { field: 'facturas', label: 'Número de facturas', type: 'number', required: true, placeholder: 'Más de 50' }
    ]
  },
  {
    code: 'trim_modelo_adicional',
    name: 'Modelo trimestral adicional',
    category: 'TRIMESTRE'
  },
  {
    code: 'trim_modelo_anual',
    name: 'Modelo anual',
    category: 'TRIMESTRE'
  },
  {
    code: 'trim_iva_alquiler',
    name: 'Modelo IVA por alquiler local',
    category: 'TRIMESTRE'
  }
];

export const categories = ['AUTÓNOMOS', 'SOCIEDADES', 'LABORAL', 'TRIMESTRE'] as const;