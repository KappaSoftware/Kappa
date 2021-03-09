# Kappa

## Contenido

1. [Introducción](#Introducción)
2. [Objetivo](#Objetivo)
3. [Documentos Clave](#Documentos_Clave)

## Introducción <a name = "Introducción"></a>

Bienvenid@ al proyecto **Kappa**, aquí puede encontrar toda la información sobre el desarrollo y publicación de contenidos.

![coverage](https://img.shields.io/badge/estado-0%25-blue?style=for-the-badge)

Kappa es un servicio de GeoRefenciación con objetivos de índole social orientado a brindar un acceso simple y rápido para la consulta de información georeferenciada y la creación de capas y puntos en el mapa de acuerdo a nuestras políticas y objetivos. Utiliza como cliente un bot de Telegram para alimentar las diferentes capas existentes o definir una nueva capa.

## Objetivo <a name = "Objetivo"></a>

Desarrollar la implementación de una herramienta de georeferenciación (Google Maps, OpenStreet Map, Ushahidi) con enfoque social orientada al posicionamiento de recursos (médicos, alimenticios, etc.), instituciones y centros de educación, eventos de seguridad (atracos, hurto, etc.) entre otros.

La implementación consta de dos partes:
1. Una plataforma de visualización web
2. Un cliente vía Telegram para el registro o solicitud de ubicaciones de interés

Los *Usuarios* de la plataforma serán clasificados en:
* **Consultores:** utilizan únicamente la interfaz web para encontrar ubicaciones de interés.
* **Mapeadores:** utilizan el cliente Telegram para registrar ubicaciones de interés.
* **Verificadores:** utilizan el cliente Telegram para reportar ubicaciones falsas o problemáticas.

## Categorías v1
1. Bienes -> alimentos y repuestos
2. Servicios -> refrigeración, salud, puntos de reciclaje
3. Ayuda -> alertas, centros de donaciones

## Categorias v2 (a discutir en reunión)
1. Encontrar cosas (donde hay?)
     1.1 Alimentos, 
     1.2 Medicinas,
     1.3 Huecos en la via,
     1.4 Repuestos
2. Encontrar personas (donde hacen?)
     2.1 Manutención de refrigeradores
     2.2 Aplicación de vacunas
     4.2 Recolección/Entrega de donaciones
     5.3 Recolección de material reciclable
     6.4 Organización de eventos 

A continuación se presentan las etapas de desarrollo del proyecto: 

### Sprint 1 (De 1 a 12 de Febrero de 2021)
- Consultar API Mapas y conocer el funcionamiento del API: Fausto y Paola
- Diseño App: Octavio y Germán
- Consultar API Telegram y conocer el funcionamiento del API: Jorge y Char

### Sprint 2 (De 15 a 26 de Febrero de 2021)
- Creación de la primera versión de código para presentación de capas en el mapa (Python y React)
- Redacción de primera versión de la Politica de Privacidad de Kappa Software
- Revisión de adecuación de los objetivos y políticas de Kappa Software a las politicas de privacidad de Telegram (primera parte)
- Migración de código del Bot desde su primera versión en Elixir a lenguaje Python
- Definición de formato de contenido del archivo .json generado a través de Telegram para ser transmitido al backend
- Definición actualizada de las categorias de busqueda: 
     - Registro de huecos en carreteras y de eventos como subcategorias de "Servicios"
     - Registro de puntos de vacunación como subcategoria de "Ayuda"

### Sprint 3 (De 1 a 12 de Marzo de 2021)
- Puesta en marcha de la página web en el servidor 
      - Definición de secciones y presentación
- Establecer comunicación Telegram-Node y Node-Mapa
- Producir primera versión de mapa con iconos "personalizados" utilizando lenguaje React
- Revisión y definición de asuntos legales relacionados a la adecuación a las politicas de Privacidad de Telegram y Términos de uso
- Diseño y administración del uso de Máquinas virtuales.

### Sprint 4 (De 15 a 26 de Marzo de 2021)
- Diseño de funcionalidades del bot 
- Definición de las políticas de aceptación de usuários por categoria
- Definición de filtros de texto para la categoria Eventos 
- Implementación de filtros para lenguaje inapropiado


## Documentos Clave <a name = "Documentos_Clave"></a>
- [Código de conducta][1]: lineamientos de conducta a seguir por los contribuidores del proyecto.
- [Licencia][2]: todo el código aquí publicado tiene licencia ![código](https://img.shields.io/badge/code-Affero%20GPL%20v3-lima?style=flat-square) y los binarios ![código](https://img.shields.io/badge/code-MIT-lima?style=flat-square), cualquier otra licencia aplicable se indicará de manera explícita en la contribución que así lo requiera. No se aceptarán contribuciones con licencias incompatibles con los principios del Software Libre.

[1]: https://github.com/KappaSoftware/Kappa/blob/main/CODE_OF_CONDUCT.md
[2]: https://github.com/piratax007/LaTeXamples/blob/master/License.md
