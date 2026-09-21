# Plataforma de Infografías Universitarias

Plataforma web estática para presentar y visualizar una colección de infografías desarrolladas en el contexto universitario.

El proyecto está diseñado para ser **pequeño, sencillo de mantener y completamente gratuito de alojar**, utilizando GitHub Pages como plataforma de publicación.

Los documentos se almacenan como archivos PDF y se visualizan mediante [PDF.js](https://mozilla.github.io/pdf.js/), evitando utilizar el visor PDF predeterminado del navegador y permitiendo construir una interfaz de visualización propia.

---

## Objetivo

Crear una plataforma web sencilla y visualmente agradable que permita:

- Explorar una colección de infografías.
- Visualizar cada infografía directamente dentro del sitio.
- Ampliar y reducir las infografías mediante zoom.
- Navegar documentos PDF de varias páginas.
- Incorporar nuevas infografías fácilmente.
- Mantener el proyecto sin backend ni base de datos.
- Publicar el sitio gratuitamente mediante GitHub Pages.

---

## Alcance

### Incluido

- Página principal.
- Catálogo de infografías.
- Visualización individual de infografías.
- Navegación entre infografías.
- Zoom.
- Soporte para documentos PDF de varias páginas.
- Diseño responsive básico.
- Renderizado mediante PDF.js.
- `manifest.json` para gestionar las infografías.
- Script local para actualizar automáticamente el manifest.
- Publicación mediante GitHub Pages.

### Fuera del alcance inicial

Para mantener el proyecto pequeño, la primera versión no incluirá:

- Sistema de usuarios.
- Inicio de sesión.
- Base de datos.
- Backend.
- API.
- Panel administrativo.
- Comentarios.
- Calificaciones.
- Favoritos.
- Estadísticas de usuarios.
- Editor de infografías.
- Generador de PDF.
- Sistema de almacenamiento propio.

Las funcionalidades adicionales deberán evaluarse antes de incorporarse.

---

## Arquitectura

La aplicación utiliza una arquitectura completamente estática:

```text
                    GitHub Repository
                           │
                           ▼
                 ┌───────────────────┐
                 │   Archivos web    │
                 │                   │
                 │ HTML              │
                 │ CSS               │
                 │ JavaScript        │
                 │ PDF.js            │
                 │ manifest.json     │
                 │ PDFs              │
                 └─────────┬─────────┘
                           │
                           ▼
                    GitHub Pages
                           │
                           ▼
                      Navegador
```

No existe un servidor de aplicación ni una base de datos.

---

## Estructura del proyecto

La estructura prevista es:

```text
infografias/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   └── viewer.js
│
├── pdf/
│   ├── infografia-01.pdf
│   ├── infografia-02.pdf
│   └── ...
│
├── pdfjs/
│   ├── pdf.min.mjs
│   └── pdf.worker.min.mjs
│
├── scripts/
│   └── publish.js
│
├── manifest.json
│
└── README.md
```

La estructura puede modificarse durante el desarrollo si se encuentra una organización más conveniente.

---

# Gestión de las infografías

Las infografías se almacenan como archivos PDF dentro de:

```text
/Infografias/Pdf
```

y como imagenes webp dentro de:

```text
/Infografias/Webp
```

El navegador no intentará descubrir directamente los archivos disponibles en esta carpeta.

En su lugar, utilizará un archivo `manifest.json` que contiene la información necesaria para construir el catálogo.

### Ejemplo

```json
{
    "infografias": [
        {
            "file": "aprendizaje-digital.pdf",
            "title": "Aprendizaje Digital",
            "description": "Descripción de la infografía",
            "category": "Tecnología y aprendizaje"
        }
    ]
}
```

El frontend leerá este archivo mediante JavaScript y generará dinámicamente el catálogo.

---

# Actualización automática del manifest

Para evitar modificar manualmente el `manifest.json` cada vez que se agregue una infografía, el proyecto contará con un script local.

El flujo previsto será:

```text
Agregar PDF
    │
    ▼
/pdf
    │
    ▼
publish.js
    │
    ├── Detectar PDFs
    ├── Actualizar manifest.json
    ├── Mostrar cambios
    ├── Git add
    ├── Git commit
    └── Git push
             │
             ▼
        GitHub Pages
```

El objetivo es que publicar una nueva infografía sea tan sencillo como:

```bash
node scripts/publish.js
```

El script deberá evitar crear commits cuando no existan cambios.

---

# Visualizador PDF

La plataforma utilizará [PDF.js](https://mozilla.github.io/pdf.js/) para renderizar los documentos.

No se utilizará el visor PDF predeterminado de Chrome, Edge u otros navegadores.

La intención es que el PDF se comporte visualmente de forma similar a una imagen dentro de la página, pero conservando las ventajas de trabajar con un documento PDF.

### Controles previstos

- Zoom +
- Zoom -
- Nivel de zoom actual.
- Navegación entre páginas.
- Desplazamiento del documento.
- Regreso al catálogo.

### Interfaz que se pretende evitar

No se utilizará inicialmente la interfaz completa del visor del navegador:

- Descargar.
- Imprimir.
- Abrir archivo.
- Barra de herramientas del navegador.
- Controles propios del visor PDF.

La interfaz será diseñada específicamente para este proyecto.

---

# Experiencia de usuario

## Página principal

se busca una interfaz amigable y didactica con animaciones que acompanene la navegacion por la imagenes, en pricipio una ardilla subiendo por un arbol topandose con afiches pegados a el, estos afiches son las imagenes, al seleccionarlas se mostrara una version mas grande al costado de la pantalla

---

# Responsive Design

La plataforma deberá funcionar correctamente en:

- Computadores de escritorio.
- Laptops.
- Tablets.
- Teléfonos móviles.

El visor tendrá especial consideración por el espacio disponible en dispositivos pequeños.

---

# Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la aplicación |
| CSS3 | Diseño y responsive |
| JavaScript | Lógica de la aplicación |
| PDF.js | Visualización de PDF |
| Node.js | Automatización local |
| Git | Control de versiones |
| GitHub | Repositorio |
| GitHub Pages | Hosting |

No se utilizará un framework frontend inicialmente.

---

# Requisitos funcionales

- **RF-01 — Mostrar catálogo:** el sistema deberá mostrar las infografías disponibles a partir de `manifest.json`.
- **RF-02 — Abrir infografía:** el usuario deberá poder seleccionar una infografía.
- **RF-03 — Visualizar PDF:** el sistema deberá renderizar el documento mediante PDF.js.
- **RF-04 — Zoom:** el usuario deberá poder aumentar y reducir el tamaño de visualización.
- **RF-05 — Documentos multipágina:** el sistema deberá permitir visualizar documentos PDF con varias páginas.
- **RF-06 — Navegación:** el usuario deberá poder regresar al catálogo desde el visor.
- **RF-07 — Actualización:** deberán poder incorporarse nuevas infografías sin modificar manualmente el código principal de la aplicación.

---

# Requisitos no funcionales

### Bajo costo

El proyecto deberá utilizar servicios gratuitos siempre que sea posible.

### Sin backend

La aplicación no deberá depender de un servidor de aplicación.

### Mantenibilidad

La estructura deberá ser sencilla de comprender y modificar.

### Rendimiento

La aplicación deberá evitar cargar innecesariamente todos los documentos PDF al abrir el catálogo.

### Responsive

La interfaz deberá adaptarse a diferentes tamaños de pantalla.

### Simplicidad

No se deberán incorporar funcionalidades que no aporten directamente al objetivo principal.

---

# Plan de desarrollo

## Fase 0 — Preparación

- [X] Crear repositorio.
- [X] Crear estructura inicial.
- [X] Configurar GitHub Pages.
- [X] Crear HTML base.
- [X] Crear CSS base.
- [X] Crear JavaScript base.

## Fase 1 — Catálogo

- [X] Crear `manifest.json`.
- [X] Cargar manifest mediante JavaScript.
- [X] Generar tarjetas de infografías.
- [X] Crear navegación hacia el visor.

## Fase 2 — Visualizador

- [ ] Integrar PDF.js.
- [ ] Cargar PDF seleccionado.
- [ ] Renderizar primera página.
- [ ] Implementar documentos multipágina.
- [ ] Implementar zoom.
- [ ] Implementar navegación.
- [ ] Adaptar visor a dispositivos móviles.

## Fase 3 — Automatización

- [ ] Crear `publish.js`.
- [ ] Detectar archivos PDF.
- [ ] Generar manifest.
- [ ] Detectar cambios.
- [ ] Automatizar commit.
- [ ] Automatizar push.

## Fase 4 — Diseño

- [ ] Definir identidad visual.
- [ ] Diseñar página principal.
- [ ] Diseñar tarjetas.
- [ ] Diseñar visor.
- [ ] Adaptar responsive.
- [ ] Añadir animaciones únicamente cuando aporten valor.

## Fase 5 — Publicación

- [ ] Probar localmente.
- [ ] Probar diferentes navegadores.
- [ ] Probar dispositivos móviles.
- [ ] Verificar PDFs.
- [ ] Verificar rutas de GitHub Pages.
- [ ] Publicar versión final.

---

# Ejecución local

Durante el desarrollo, el proyecto podrá ejecutarse utilizando un servidor HTTP local.

Por ejemplo:

```bash
npx serve .
```

o cualquier servidor estático equivalente.

Esto es preferible a abrir directamente `index.html` con `file://`, especialmente debido a las restricciones del navegador relacionadas con módulos JavaScript y carga de archivos.

---

# Publicación

El proyecto será publicado mediante:

**GitHub Pages**

El repositorio contendrá todos los recursos necesarios para ejecutar la aplicación:

```text
HTML
CSS
JavaScript
PDF.js
PDFs
manifest.json
```

No se requiere un servidor backend.

---

# Criterio de finalización

La primera versión podrá considerarse terminada cuando:

1. El usuario pueda acceder al sitio.
2. Pueda visualizar el catálogo de infografías.
3. Pueda seleccionar una infografía.
4. El PDF se muestre dentro de la interfaz propia del sitio.
5. Pueda hacer zoom.
6. Pueda navegar documentos multipágina.
7. La plataforma funcione correctamente en computador y móvil.
8. Una nueva infografía pueda incorporarse mediante el flujo automatizado.
9. El proyecto funcione mediante GitHub Pages.
10. No sea necesario mantener ningún backend o base de datos.

---

# Posibles mejoras futuras

Estas funcionalidades quedan deliberadamente fuera de la primera versión:

- Búsqueda.
- Categorías.
- Filtros.
- Modo oscuro.
- Transiciones entre documentos.
- Miniaturas de páginas.
- Compartir una infografía mediante URL.
- Metadatos más completos.
- Generación automática de miniaturas.
- Estadísticas de visitas mediante un servicio externo.
- PWA / instalación como aplicación.

Estas mejoras deberán evaluarse después de completar el alcance de la primera versión.

---

# Control de alcance

El propósito principal del proyecto es:

> **Presentar y facilitar la consulta de infografías universitarias.**

Antes de incorporar una nueva funcionalidad se deberá responder:

> ¿Esta funcionalidad mejora directamente la presentación, navegación o accesibilidad de las infografías?

Si la respuesta es negativa, deberá considerarse fuera del alcance inicial.

---

## Estado del proyecto

**Versión:** 0.1 — Planificación

**Estado:** En desarrollo

El proyecto prioriza una implementación pequeña, estática y fácil de mantener antes de considerar funcionalidades adicionales.