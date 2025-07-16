# 🌤️ Tiempo Real - Aplicación de Clima

Una aplicación web moderna y responsive para consultar información meteorológica en tiempo real de cualquier ciudad del mundo.

## 📋 Descripción

**Tiempo Real** es una aplicación web desarrollada en React que permite a los usuarios consultar información meteorológica detallada de ciudades de todo el mundo. La aplicación ofrece una interfaz intuitiva y moderna con funcionalidades avanzadas como historial de búsquedas, atajos de teclado y diseño completamente responsive.

## ✨ Características Principales

### 🌍 **Consulta de Clima**
- Búsqueda por ciudad y país
- Información meteorológica en tiempo real
- Datos detallados: temperatura, humedad, presión, viento, sensación térmica
- Iconos descriptivos del clima
- Hora local de la ciudad consultada

### 🎨 **Interfaz de Usuario**
- Diseño moderno con gradientes y efectos visuales
- Animaciones suaves y transiciones
- Interfaz completamente responsive (móvil, tablet, desktop)
- Modo oscuro/claro automático
- Iconos de FontAwesome para mejor UX

### 📱 **Funcionalidades Avanzadas**
- **Historial de búsquedas**: Guarda las últimas 10 consultas
- **Atajos de teclado**: 
  - `Ctrl/Cmd + K`: Enfocar formulario de búsqueda
  - `Ctrl/Cmd + R`: Actualizar clima actual
  - `Escape`: Cerrar modales
- **Persistencia de datos**: Historial guardado en localStorage
- **Validación en tiempo real**: Formularios con validación instantánea
- **Estados de carga**: Spinner y mensajes informativos

### 🔧 **Características Técnicas**
- **Validación de datos**: Zod para validación de respuestas API
- **Manejo de errores**: Gestión completa de errores de red y API
- **Optimización**: Lazy loading y memoización
- **Accesibilidad**: ARIA labels y navegación por teclado
- **SEO**: Meta tags y estructura semántica

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 19.0.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.7.2** - Tipado estático para mayor seguridad
- **Vite 6.1.0** - Build tool y servidor de desarrollo
- **Tailwind CSS 3.4.17** - Framework de CSS utility-first
- **PostCSS 8.5.3** - Procesamiento de CSS

### **Librerías Principales**
- **Axios 1.7.9** - Cliente HTTP para peticiones API
- **Zod 3.24.2** - Validación de esquemas TypeScript
- **FontAwesome 6.7.2** - Iconografía y iconos SVG

### **Herramientas de Desarrollo**
- **ESLint 9.19.0** - Linting y análisis de código
- **SWC** - Compilador rápido para React
- **Autoprefixer** - Compatibilidad cross-browser

## 🌐 API Externa

La aplicación utiliza la **API de OpenWeatherMap** para obtener:
- Información meteorológica en tiempo real
- Coordenadas geográficas de ciudades
- Datos de temperatura, humedad, presión, viento
- Iconos y descripciones del clima

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Form/           # Formulario de búsqueda
│   ├── WeatherDetail/  # Detalles del clima
│   └── Spinner/        # Componente de carga
├── hooks/              # Custom hooks
│   └── useWeather.ts   # Lógica de consulta de clima
├── types/              # Definiciones de TypeScript
├── data/               # Datos estáticos (países)
├── helpers/            # Funciones auxiliares
└── Alert/              # Componente de alertas
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Agregar tu API key de OpenWeatherMap en VITE_API_KEY
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en http://localhost:5173
```

### Producción
```bash
# Construir para producción
npm run build

# Preview de la build
npm run preview
```

## 🔑 Configuración de API

1. Regístrate en [OpenWeatherMap](https://openweathermap.org/api)
2. Obtén tu API key gratuita
3. Crea un archivo `.env` en la raíz del proyecto
4. Agrega: `VITE_API_KEY=tu_api_key_aqui`

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Móvil**: 480px - 767px
- **Móvil pequeño**: < 480px

## 🎯 Características de UX/UI

- **Diseño intuitivo**: Navegación clara y fácil de usar
- **Feedback visual**: Estados de carga, errores y éxito
- **Accesibilidad**: Compatible con lectores de pantalla
- **Performance**: Carga rápida y optimizada
- **Cross-browser**: Compatible con todos los navegadores modernos

## 🔒 Seguridad

- Validación de entrada en frontend y backend
- Sanitización de datos de usuario
- Manejo seguro de API keys
- Prevención de XSS y CSRF

## 📈 Futuras Mejoras

- [ ] Pronóstico extendido (5 días)
- [ ] Mapa interactivo de clima
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Temas personalizables
- [ ] Widgets para escritorio
- [ ] Integración con más APIs meteorológicas

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando React, TypeScript y Vite**
