# El misterio de nuestro universo

Una aventura de cumpleaños en React + TypeScript + Vite, con ilustración original de bosque, diario interactivo, álbum con las 15 fotografías encontradas en `Fotos/`, Pajaporte con 14 países, recuerdo del primer viaje a Poznań, quiz, búsqueda de símbolos, dragón original y atlas visual de animación con lupa y reto de mirada.

## Ejecutar

Recomendado: Node.js 22 LTS y npm.

```sh
npm ci
npm run dev
```

Abre la dirección que imprime Vite. Para generar y revisar la versión final:

```sh
npm run build
npm run preview
```

`dist/` es la web compilada. No abras `index.html` mediante doble clic: usa un servidor HTTP. La compilación también comprueba TypeScript.

## Personalizar antes de regalar

| Archivo                     | Contenido                                                                         |
| --------------------------- | --------------------------------------------------------------------------------- |
| `src/data/couple.ts`        | Fechas, recuerdos, notas, carta, pistas, número de países y privacidad del chiste |
| `src/data/photos.ts`        | Fotos de portada, hitos y final                                                   |
| `src/data/gallery.json`     | Fotografías del collage, pies de foto y mensajes del reverso                      |
| `src/data/quiz.ts`          | Preguntas, opciones y respuesta correcta (índice desde cero)                      |
| `src/data/pajaporteGame.ts` | Número de parejas, duración de pistas y textos del juego de memoria               |
| `public/images/couple/`     | Fotografías reales copiadas; originales intactos en `Fotos/`                      |
| `src/styles/global.css`     | Estética, animaciones y adaptación móvil                                          |

1. La carta ya contiene el mensaje de Javi para Gade y está marcada como personalizada. Puedes editarla en `couple.letter`; se han respetado sus palabras, añadiendo puntuación y separándolas en párrafos.
2. La línea temporal muestra solo los hechos confirmados y las fotos asignadas. Se han eliminado las notas de anécdotas pendientes. El álbum ya no muestra mensajes al dorso: catorce fotos tienen globos y una contiene el cuarto secreto.
3. Las cuatro fotos adjuntas están asignadas en el orden indicado por Javi: encuentro, beso, lugar donde le pidió salir y Poznań. Se conservan completas en `public/images/couple/hito-*.webp`, sin recortar rostros. Las rutas están en `src/data/photos.ts`.
4. El Pajaporte ya incluye los 14 países únicos proporcionados: Polonia, Italia, Hungría, Noruega, Alemania, Albania, Montenegro, Islandia, Malta, República Checa, Grecia, Reino Unido, España y Nepal. La lista está en `countryNames`, sin duplicados; los contadores y la respuesta del quiz se calculan a partir de ella. Los países aparecen juntos en una página legible del diario, sin diálogos repetidos. Poznań se destaca en un billete decorativo como primer viaje.
5. La sección de la artista es un atlas de doce imágenes de animación. La selección, los créditos y las notas se editan en `src/data/artAtlas.ts`; los archivos optimizados están en `public/images/art-atlas/`. El antiguo lienzo se ha retirado.
6. Para ocultar el contenido íntimo, usa `showPrivateJoke: false` en `couple.ts`: el Pajaporte se presenta como un diario de viajes y la pregunta del quiz vuelve a hablar de países compartidos. Puedes cambiar el nombre en `travelTitle`. La configuración es de código, no un panel público. El contenido de una web estática no puede proteger secretos: elimina también el texto privado antes de una publicación si no debe descargarse.

Para añadir recuerdos, amplía `memories` sin modificar componentes. Para añadir fotos al collage, amplía `gallery.json`; conserva un identificador que comience por `galeria`. Las imágenes conservan su proporción con `object-fit: contain`. Se muestran alternativas si falta un archivo. Ninguna imagen de personas se ha generado ni se han atribuido años o historias nuevas.

## Interacciones y accesibilidad

- Navegación por capítulos, introducción saltable y apertura animada del diario.
- Quiz de cinco preguntas, bloqueo de doble respuesta, aciertos, errores, puntuación, confeti y repetición.
- El quiz es el capítulo 03 y aparece antes del Pajaporte (capítulo 04), también en la navegación.
- «La maleta del dragón»: juego de memoria con seis parejas elegidas entre vuestros países. Cuenta intentos y pistas, permite volver a barajar y entrega la estrella al completarlo. Puede saltarse sin bloquear la carta.
- Símbolos Hoja, Estrella y Luna en historia, Pajaporte y artista. Pistas opcionales, acompañante y alternativa para saltar el acertijo. Las dos vías abren la carta.
- Álbum: ampliar, navegar con botones, deslizar con el dedo y girar las fotos con mensaje. Los diálogos cierran con Escape y mantienen el foco dentro mediante `<dialog>`.
- Atlas de arte con filtros, lupa del 100 al 300 %, navegación de láminas y reto de mirada con blanco y negro y pistas. Se ha eliminado la colección de favoritos.
- Aviso de felicitación sintetizado de unos 0,19 s al pulsar el contador de secretos o recoger sus símbolos. Sin música ni control de volumen; no suena al navegar por recuerdos ni al abrir el diario.
- Los símbolos y recuerdos se guardan en localStorage. Para reiniciar la experiencia, borra los datos del sitio del navegador (claves `universo-symbols`, `universo-memories`, `universo-skipped`). No se envían datos a un backend.
- Soporte de movimiento reducido, botones con etiquetas, navegación por teclado y diseño móvil. Las fuentes de Google son el único recurso visual externo; si no cargan se usan fuentes alternativas locales.

## GitHub Pages (preparado, no publicado)

**Las fotos son personales. No subas esta carpeta a un repositorio público sin el consentimiento de las personas fotografiadas. GitHub Pages puede ser público aunque el repositorio sea privado; verifica el acceso disponible en tu cuenta antes de compartir. El acertijo no es un control de acceso.**

Cuando hayas revisado la personalización y autorizado la publicación:

1. Crea un repositorio con el nombre que elijas. No se presupone ningún usuario de GitHub. Si incluyes fotos, decide primero la privacidad.
2. Sube el proyecto a la rama `main`, incluyendo `package-lock.json` y `.github/workflows/deploy.yml`. No subas `node_modules/` ni `dist/`. La carpeta `Fotos/` está ignorada para evitar subir los originales duplicados; las copias usadas en `public/images/couple/` **sí** forman parte de la web.
3. En el repositorio abre **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Ejecuta **Actions → Publicar en GitHub Pages → Run workflow**, o haz un nuevo push a `main`. Cada push posterior desplegará automáticamente.
5. La ejecución muestra la URL final en el entorno `github-pages`.

En `vite.config.ts`, `base: './'` hace las rutas relativas y permite desplegar en `https://TU_USUARIO.github.io/NOMBRE_REPOSITORIO/` sin fijar un nombre. Si prefieres base explícita, reemplázala por `'/NOMBRE_REPOSITORIO/'` (con ambas barras). Para repositorio raíz `TU_USUARIO.github.io`, puedes usar `'/'`. Si cambias de nombre el repositorio, actualiza la base explícita; con la relativa no hace falta.

El workflow usa Node 22, instala desde el lockfile, comprueba TypeScript, genera Vite y despliega el artefacto. No se ha creado un repositorio remoto ni publicado la web.

## Recursos

El bosque de `public/images/forest.webp` se generó para este proyecto y se optimizó a WebP. Los paisajes de sustitución y el dragón son SVG propios. Iconos de Lucide y transiciones de Framer Motion. El atlas incorpora arte de producción y fotogramas de las obras indicadas, con autoría, titularidad y enlaces a sus fuentes en cada ficha. El antiguo mapa ficticio y los sellos interactivos se han sustituido por un diario de países y un billete de Poznań; sus estilos están en `src/sections/TravelSection.module.css`.

## Verificación realizada

- `npm run build`: TypeScript y compilación de producción correctos.
- Navegador: apertura del libro, símbolos y desbloqueo, alternativa para saltar el acertijo, quiz completo con 5/5 y repetición, lightbox y cambio de foto.
- Diseño inspeccionado en escritorio y móvil; anchos de 320 y 390 px sin desbordamiento horizontal.

- Rutas del bosque en CSS compilado relativas (`../images/forest.webp`), aptas para el subdirectorio de GitHub Pages.

Se incluye `vista-previa.jpg` como captura de la portada. Las pruebas no sustituyen la revisión de los textos y las fotos por Javi.

## Revisión móvil y Pajaporte

- El Pajaporte representa 14 países donde habéis hecho el amor. La quinta pregunta y su mensaje de acierto usan ese significado. El nombre se edita en `travelTitle` y la visibilidad en `showPrivateJoke`.
- Verificación responsive en navegador a 320×740, 375×812, 390×844, 430×932, 768×1024 y 844×390: sin desbordamiento horizontal, ni en las secciones.
- Mejoras: recuerdos en dos columnas en móvil, menú con los seis capítulos, controles de 44 px, paleta más cómoda, portada sin altura máxima que corte contenido, ajuste del lightbox horizontal y márgenes de zona segura.
- El quiz vuelve al inicio del bloque al avanzar y al repetir para mantener visible el enunciado. Recorrido completo 5/5 comprobado.
- El lightbox distingue desplazamiento vertical y deslizamiento horizontal. Los diálogos restauran el foco al cerrar.
- Comprobados cambio de fotografía, menú móvil y alternativa de privacidad del quiz. Sin errores en la consola durante esta revisión. Captura: `pajaporte-movil.jpg`.
- Las comprobaciones usan tamaños emulados en el navegador; no se han probado dispositivos físicos iPhone/Android ni Safari.

## Pajaporte simplificado

Se han eliminado el mapa ficticio, los sellos y sus diálogos de texto repetido. El Pajaporte es una doble página: portada y lista numerada de los 14 países, apiladas en móvil. Un billete decorativo recuerda el primer viaje a Poznań. No hay botones sobre países que carecen de contenido propio. La estrella del acertijo se obtiene ahora en «La maleta del dragón», o pidiéndosela al guardián sin jugar.

Revisado en 320, 390, 768 y 1280 px sin desbordamientos; 14 países visibles, ningún diálogo de sellos, estrella operativa, consola sin errores y compilación correcta. Capturas actuales: `pajaporte-diario.jpg` y `pajaporte-movil.jpg`.

## Juego y orden de capítulos

La historia comienza sellada: no se montan las fechas, fotos ni el símbolo de la timeline hasta completar las cinco preguntas del quiz. El último botón desbloquea la historia y desplaza la página hasta ella, respetando la preferencia de movimiento reducido y llevando allí el foco. No se exige una puntuación mínima. El desbloqueo se guarda en `universo-story-unlocked`; «Reiniciar descubrimientos» lo elimina y reinicia la partida del quiz. Desde el resultado se puede volver a la historia o repetir las preguntas. Comprobadas las dos vistas mediante renderizado y compilación de producción; pendiente la comprobación visual del desplazamiento en navegador.

El orden es historia, álbum, quiz (03), Pajaporte (04), misterio (05) y artista (06). La lista de países y su contador aparecen después del quiz. El Pajaporte incorpora «La maleta del dragón»: doce cartas con seis parejas seleccionadas al azar entre los países confirmados. La selección y las posiciones cambian al volver a barajar.

Las pistas muestran una pareja brevemente sin resolverla automáticamente. Los fallos vuelven a ocultar las cartas, los aciertos permanecen descubiertos, se cuentan intentos y pistas y la victoria entrega la estrella del acertijo. También se puede pedir la estrella sin jugar. El tablero admite ratón, pulsaciones táctiles y botones de teclado; no exige arrastrar ni superar un tiempo límite. La partida no se guarda al recargar; los símbolos recogidos mantienen el guardado local existente.

Configuración en `src/data/pajaporteGame.ts`; lógica de barajado en `src/games/pajaporteMemory.ts`, componente y estilos en `src/games/PajaporteGame.*`.

Verificado: partida completa 6/6, pista temporal, fallo y ocultación, repetición, reinicio, alternativa para no jugar y recogida de la estrella. Cien barajas comprobadas con dos cartas por país, sin duplicados de identificador ni destinos ajenos a la lista. Comprobados 320, 390, 768 y 1280 px sin desbordamientos; cartas de al menos 72 px de ancho en el tamaño más estrecho. Compilación correcta y consola sin errores. Capturas: `juego-pajaporte.jpg` y `juego-pajaporte-movil.jpg`.

## Atlas de la imaginación

Doce láminas: tres estudios de color de Woonyoung Jung para _Cómo entrenar a tu dragón 3_, dos fondos conceptuales de Nick Cross para _Over the Garden Wall_, dos diseños de personajes de su piloto de Mikkel Sommer, un retrato de Desdentao realizado con lápices de colores por Manuel Reartes y cuatro fotogramas oficiales de Ghibli. Cada ficha identifica el tipo de imagen y acredita su procedencia. El dibujo de Desdentao es fan art, no concept art oficial. [Fuente del retrato a lápices](https://www.saatchiart.com/en-gt/art/Drawing-Toothless-in-Colored-Pencil/2959419/13687177/view).

«Todos los mundos» usa columnas independientes, con separación de 32 px entre tarjetas y proporciones naturales. En móvil se presenta una sola columna. No se recortan las imágenes para igualar las alturas ni se añaden marcos verdes. La ficha se abre desde «Explorar lámina» y, al tocar su imagen, la lupa pasa al 200 %. Permite ajustar al 100 %, aumentar hasta el 300 %, desplazarse por los detalles y volver a la ficha.

Los favoritos se han eliminado. «Reto de mirada» elige una lámina del filtro actual, la muestra en blanco y negro y propone observar su luz, silueta y contraste. Se puede descubrir una pista, volver al color o pedir otro reto. «Vol. 01» se mantiene por petición de Javi como detalle editorial sin función interactiva.

Contenido y créditos: `src/data/artAtlas.ts`. Componente y estilos: `src/sections/ArtAtlas.*`. Imágenes locales: `public/images/art-atlas/`.

## Cinco secretos y álbum de globos

El acertijo exige hoja, estrella, luna, corazón y pluma. La pluma se esconde junto a la última obra de Nulliusterra, en el capítulo 07; su pista lleva a esa galería. Los contadores se calculan a partir de `mystery` y la carta se desbloquea al encontrar todos, o con la alternativa explícita de saltar el acertijo. Los símbolos de visitas anteriores se conservan. Comprobado que cuatro símbolos no bastan, los cinco permiten abrir la carta y la galería contiene una sola pluma. Los botones del resultado del quiz tienen un contenedor vertical con separación de 14 px y altura mínima de 50 px para evitar que se toquen.

Las quince fotografías se pueden girar. Una sola, definida por `albumSecretPhotoId` en `src/data/photos.ts`, contiene un corazón que se pulsa para recogerlo. Las otras catorce muestran globos de cumpleaños y no muestran texto al dorso. El corazón no está en el DOM mientras la foto permanece de frente. La foto vuelve a girarse con el mismo control; la ampliación de la fotografía se mantiene en su anverso.

Los símbolos y recuerdos se conservan localmente. Los reversos girados se reinician al recargar. El botón de reiniciar descubrimientos permite volver a comenzar; no altera fotos ni contenido.

## Ritmo y sonido

Apertura del diario: 6,5 s, con 1,2 s antes del giro de 1,6 s. Cartas fallidas: 1,8 s visibles; pistas: 2,6 s. Al pulsar el contador o recoger un secreto suena una felicitación sintetizada de unos 0,19 s. Sin música ni botón de volumen. El sobre mantiene separados sello y dedicatoria.

## Verificación de esta edición

### Galería personal y ajustes móviles

Añadida una galería de tres obras aportadas por el usuario, acreditadas a **Nulliusterra**, con vista completa, navegación y ampliación de detalles. Las etiquetas son descripciones, no títulos atribuidos a la autora. La fotografía de la carta final se ha sustituido por la nueva imagen de la pareja.

En pantallas de hasta 760 px, la primera timeline usa cuatro tarjetas en dos columnas y selección en verde oscuro; las fotos conservan su proporción. El sobre con sello tiene papel más claro, tinta más oscura y menos inclinación, con controles y pistas más legibles. Los colores de la carta final de felicitación se conservan.

Compilación de producción correcta. Contrastes calculados entre 7,01:1 y 10,04:1 para los seis pares principales de texto y fondo modificados. Esta actualización no tiene nueva comprobación visual en navegador: la herramienta bloqueó el acceso a la vista local. Las verificaciones de navegador enumeradas a continuación pertenecen a la edición anterior.

- Quince reversos: catorce grupos de globos y un único corazón, sin mensajes ni botones anidados.
- Carta bloqueada con 3/4 y disponible con 4/4; persistencia después de recargar y corazón oculto hasta girar su fotografía.
- Cuatro imágenes de la historia cargadas, sin notas pendientes de anécdotas.
- Doce láminas y separación uniforme de 32 px entre tarjetas de cada columna en escritorio.
- Sin desbordamiento de página ni de los cuatro símbolos a 320, 390, 768 y 1280 px.
- Zoom, vista completa, vuelta a ficha, reto de mirada, revelado de pista y cambio entre color y blanco y negro comprobados en navegador.
