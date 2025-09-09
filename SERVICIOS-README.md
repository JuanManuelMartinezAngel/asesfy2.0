# Sistema de Servicios Puntuales

## Descripción

Sistema completo para gestionar servicios puntuales con catálogo, búsqueda, filtros, carrito de compras y envío de solicitudes de presupuesto.

## Características

### ✅ Funcionalidades Implementadas

- **Catálogo de servicios** con 70+ servicios fiscales organizados por categorías
- **Búsqueda con debounce** (300ms) que filtra por título y descripción
- **Filtros por categoría** con multiselección: Autónomos, Sociedades, Laboral, Trimestres
- **Carrito de compras** con slide-over lateral y badge de contador
- **Formulario de solicitud** con validaciones y envío a Supabase
- **Persistencia en URL** de filtros y búsqueda para compartir enlaces
- **Responsive design** adaptado a todos los dispositivos
- **Estados de carga y vacío** con UX optimizada

### 🗄️ Base de Datos (Supabase)

#### Tablas

**`public.services`**
- `id` - UUID (PK)
- `slug` - Texto único
- `title` - Título del servicio
- `category` - Categoría (AUTONOMOS | SOCIEDADES | LABORAL | TRIMESTRES)
- `summary` - Descripción breve
- `price_note` - Nota de precio (no se muestra públicamente por defecto)
- `is_published` - Boolean para control de visibilidad
- `created_at` - Timestamp

**`public.orders`**
- `id` - UUID (PK)
- `created_at` - Timestamp
- `customer_name` - Nombre del cliente
- `customer_email` - Email del cliente
- `customer_phone` - Teléfono (opcional)
- `services_slugs` - Array de slugs de servicios
- `services_titles` - Array de títulos de servicios
- `notes` - Notas adicionales (opcional)

#### RLS (Row Level Security)

- **services**: Lectura pública para servicios publicados, lectura completa para usuarios autenticados
- **orders**: Inserción pública para solicitudes, lectura solo para usuarios autenticados

## Configuración

### 1. Variables de Entorno

Crear archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SHOW_PRICES=false
```

### 2. Configuración de Supabase

1. **Crear proyecto en Supabase**
2. **Ejecutar el script SQL** (`supabase-setup.sql`) en el SQL Editor:
   - Crea las tablas `services` y `orders`
   - Configura las políticas RLS
   - Inserta los 70+ servicios del catálogo

3. **Obtener credenciales**:
   - URL del proyecto: Settings → API → Project URL
   - Clave anónima: Settings → API → Project API keys → anon public

### 3. Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## Uso

### Navegación
- Acceder a `/servicios` desde el menú superior
- El enlace "Servicios Puntuales" está disponible en desktop y móvil

### Flujo de Usuario
1. **Explorar servicios** - Navegar por el catálogo
2. **Buscar y filtrar** - Usar buscador y filtros por categoría
3. **Añadir al carrito** - Seleccionar servicios de interés
4. **Revisar selección** - Abrir carrito lateral para revisar
5. **Solicitar presupuesto** - Completar formulario y enviar

### Gestión de Pedidos

Los pedidos se guardan en la tabla `orders` de Supabase. Para ver los pedidos:

1. **Supabase Dashboard** → Table Editor → `public.orders`
2. **Campos importantes**:
   - `customer_name`, `customer_email`, `customer_phone`
   - `services_titles` - Lista de servicios solicitados
   - `notes` - Información adicional del cliente
   - `created_at` - Fecha de solicitud

## Arquitectura Técnica

### Componentes Principales

- **`ServicesPage`** - Página principal con búsqueda y filtros
- **`ServiceCard`** - Tarjeta individual de servicio
- **`SearchBar`** - Buscador con debounce
- **`Filters`** - Filtros por categoría con chips
- **`Cart`** - Carrito lateral con Sheet/Slide-over
- **`RequestModal`** - Modal del formulario de solicitud

### Estado Global
- **`CartContext`** - Gestión del estado del carrito con React Context

### Integración
- **Supabase** - Base de datos y API
- **React Router** - Navegación y persistencia de URL
- **Shadcn/UI** - Componentes de interfaz

## Personalización

### Mostrar Precios
Por defecto los precios están ocultos (`SHOW_PRICES=false`). Para mostrarlos:

1. Cambiar `.env.local`: `SHOW_PRICES=true`
2. Los precios se mostrarán como texto informativo (campo `price_note`)

### Añadir Servicios
1. **Vía SQL**: Insertar en la tabla `services`
2. **Vía Dashboard**: Usar Table Editor de Supabase

### Personalizar Categorías
Modificar las constantes en `Filters.tsx` y `ServiceCard.tsx`:
- `CATEGORIES` - Lista de categorías
- `CATEGORY_COLORS` - Colores por categoría
- `CATEGORY_LABELS` - Etiquetas mostradas

## Próximas Mejoras

- [ ] Sistema de autenticación para administrar servicios
- [ ] Panel de administración para gestionar catálogo
- [ ] Notificaciones por email automáticas
- [ ] Integración con sistemas de CRM
- [ ] Analytics y métricas de conversión

## Soporte

Para problemas o mejoras, revisar:
1. **Logs de Supabase** para errores de base de datos
2. **Console del navegador** para errores de frontend
3. **Network tab** para problemas de conectividad