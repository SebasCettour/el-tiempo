# 🌤️ SkyGlow - Aplicación del Clima

> **Donde el cielo brilla** ✨

## 📋 Descripción del Proyecto

SkyGlow es una aplicación web moderna y elegante para consultar información meteorológica en tiempo real de cualquier ciudad del mundo. Desarrollada con React, TypeScript y Vite, ofrece una experiencia de usuario fluida e intuitiva con un diseño visual impactante basado en degradados púrpura y rosa.

## 🎯 Objetivo del Proyecto

Crear una aplicación del clima que no solo sea funcional, sino que también destaque por su diseño moderno, accesibilidad y experiencia de usuario excepcional. El proyecto demuestra competencias en:
- Desarrollo frontend moderno con React y TypeScript
- Consumo de APIs REST (OpenWeather API)
- Diseño UI/UX responsive y accesible
- Gestión de estado y optimización de rendimiento
- Buenas prácticas de desarrollo web

## ✨ Características Principales

### 🔍 Funcionalidades Core
- **Búsqueda de clima** por ciudad y país
- **Información meteorológica completa**: temperatura, sensación térmica, humedad, presión, viento, nubosidad
- **Historial de búsquedas** persistente con localStorage
- **Indicador de calidad del clima** (condiciones ideales, normales o extremas)
- **Sistema de notificaciones Toast** elegante y no intrusivo
- **Copiar al portapapeles** toda la información del clima

### ⌨️ Atajos de Teclado
- `Ctrl/Cmd + K` - Enfocar campo de búsqueda
- `Ctrl/Cmd + R` - Actualizar clima actual
- `Escape` - Cerrar modales

### 🎨 Diseño y UX
- **Tema moderno** con degradados púrpura/rosa vibrantes
- **Animaciones fluidas** y transiciones suaves
- **Diseño responsive** optimizado para móvil, tablet y escritorio
- **Modo de alto contraste** y soporte para preferencias de accesibilidad
- **Iconos animados** del clima con efectos visuales

### 🚀 Rendimiento
- **Componentes memoizados** para evitar re-renders innecesarios
- **Hooks optimizados** con useMemo y useCallback
- **Lazy loading** de imágenes
- **Validación de datos** con Zod

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Librería de interfaces de usuario
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool rápido y moderno
- **CSS Modules** - Estilos encapsulados y mantenibles

### APIs y Librerías
- **OpenWeather API** - Datos meteorológicos en tiempo real
- **Axios** - Cliente HTTP para peticiones
- **Zod** - Validación de esquemas y tipos
- **Font Awesome** - Iconos vectoriales

### Características de Desarrollo
- **ESLint** - Linting y calidad de código
- **Git** - Control de versiones
- **Responsive Design** - Mobile-first approach

## 📊 Arquitectura del Proyecto

```
el-tiempo/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Form/           # Formulario de búsqueda
│   │   ├── Spinner/        # Indicador de carga
│   │   ├── Toast/          # Sistema de notificaciones
│   │   └── WeatherDetail/  # Visualización del clima
│   ├── hooks/              # Custom hooks (useWeather)
│   ├── helpers/            # Funciones auxiliares
│   ├── types/              # Definiciones de TypeScript
│   └── data/               # Datos estáticos (países)
├── public/                 # Assets estáticos
└── [configs]              # Configuraciones (vite, ts, eslint)
```

## 🎨 Paleta de Colores

- **Primarios**: Púrpura (#a855f7, #c084fc), Rosa (#ec4899, #f472b6)
- **Acentos**: Amarillo (#fde047), Azul (#60a5fa), Verde (#34d399)
- **Fondos**: Degradados dinámicos con índigo y púrpura profundo

## 🔑 Aprendizajes Clave

1. **Integración de APIs externas** y manejo de respuestas asíncronas
2. **Manejo avanzado de estado** con hooks personalizados
3. **Validación de datos** con Zod para mayor robustez
4. **Diseño responsive** con CSS Grid y Flexbox
5. **Optimización de rendimiento** con técnicas de React
6. **Accesibilidad web** (ARIA labels, roles semánticos)
7. **TypeScript avanzado** con tipos complejos e interfaces
8. **Persistencia de datos** con localStorage
9. **Gestión de errores** y feedback al usuario

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Móviles** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)
- **4K y pantallas grandes** (1920px+)

## ♿ Accesibilidad

- Navegación por teclado completa
- Labels ARIA descriptivos
- Roles semánticos correctos
- Soporte para lectores de pantalla
- Modo de alto contraste
- Reducción de movimiento respetada

## 🚀 Mejoras Futuras Potenciales

- [ ] Pronóstico extendido de 5-7 días
- [ ] Gráficos de temperatura con Chart.js
- [ ] Geolocalización automática
- [ ] Modo oscuro/claro toggle
- [ ] Comparación entre ciudades
- [ ] Alertas meteorológicas push
- [ ] Widgets descargables
- [ ] Compartir en redes sociales
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## 📈 Métricas del Proyecto

- **Líneas de código**: ~3,000+
- **Componentes**: 8 principales
- **Hooks personalizados**: 1 (useWeather)
- **Tiempo de desarrollo**: ~40 horas
- **Cobertura de responsive**: 100%

## 🎓 Competencias Demostradas

### Técnicas
- ✅ React Hooks avanzados (useState, useEffect, useCallback, useMemo, useRef)
- ✅ TypeScript con tipos complejos e interfaces
- ✅ Consumo de APIs REST
- ✅ Gestión de estado global y local
- ✅ Validación de datos con Zod
- ✅ CSS moderno (Grid, Flexbox, Variables, Animaciones)
- ✅ Optimización de rendimiento
- ✅ Manejo de errores y casos edge

### Blandas
- ✅ Resolución de problemas
- ✅ Diseño UI/UX
- ✅ Atención al detalle
- ✅ Documentación técnica
- ✅ Pensamiento crítico
- ✅ Mejora continua

## 🔗 Enlaces

- **Demo en vivo**: [Próximamente]
- **Repositorio**: [GitHub - SebasCettour/el-tiempo](https://github.com/SebasCettour/el-tiempo)
- **API utilizada**: [OpenWeather API](https://openweathermap.org/)

## 👨‍💻 Autor

**Sebastián Cettour**
- Desarrollador Frontend
- Apasionado por crear experiencias web excepcionales

## 📝 Licencia

Este proyecto fue desarrollado con fines educativos y de portfolio.

---

## 🖼️ Capturas de Pantalla

### Vista Principal
*Interfaz moderna con degradados púrpura y rosa, formulario de búsqueda intuitivo*

### Vista del Clima
*Información meteorológica completa con iconos animados y diseño card elegante*

### Responsive Design
*Diseño adaptativo perfecto en todos los dispositivos*

### Sistema de Notificaciones
*Toasts elegantes con diferentes tipos (éxito, error, info)*

---

**Nota**: Este proyecto está en continuo desarrollo y mejora. Las contribuciones y sugerencias son bienvenidas.

*Última actualización: Noviembre 2025*
