# You can really learn about sexuality through a MOOC!

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/img/main-banner.jpg)

<a href="https://github.com/ansegura7/VA_FinalProject_MOOC/blob/master/paper/Proyecto_Final_VA_EN.pdf" target="_blank">Paper</a> | <a href="https://ansegura7.github.io/VA_FinalProject_MOOC/site/index.html" target="_blank">WebSite</a> | <a href="https://youtu.be/916khzlJZpw" target="_blank">Video</a> | <a href="https://docs.google.com/presentation/d/1RNJCR9KBawwebVmRBvZRcYJvi-myQnZqiWp_mZo2Mbw/edit?usp=sharing" target="_blank">Slides</a> | <a href="https://twitter.com/SeguraAndres7/status/1069725841125457920" target="_blank">Tweet</a> | <a href="https://github.com/ansegura7/VA_FinalProject_MOOC" target="_blank">Code</a>

- Estudiantes: Vladimir E. Cuevas, Juan Carlos Oyuela y Andres Segura Tinoco
- Curso: Visual Analytics
- Proyecto Final
- Fecha: 12/04/2018

## Introducción
La Universidad de los Andes, dentro de su proceso de innovación y exploración del esquema educativo, ha desarrollado un conjunto de cursos virtuales (MOOC's) que pretenden extender la enseñanza mucho más allá de sus fronteras físicas. En particular, el departamento de Psicología ha creado el MOOC “Sexualidad… mucho más que sexo”, el cual tiene como objetivo mejorar la experiencia de los estudiantes para hablar acerca de sexualidad con niñas, niños, estudiantes, pareja o colegas. Este curso se encuentra implementado dentro de la plataforma COURSERA, a partir de la cual se pretende realizar un ejercicio de análisis y construcción de visualización de datos, que fortalezcan el posicionamiento del curso y la posibilidad de mejorar sus contenidos.

## Datos del Proyecto – What
El dataset principal que se utiliza para la visualización es del tipo temporal y estático, y contiene la información relevante de los estudiantes que se inscriben diariamente en el MOOC. Los atributos del dataset son los siguientes:
- Student ID: ordinal y secuencial
- Grade Note: cuantitativo y secuencial (de 0.0 a 1.0)
- Country Origin: categórico
- Country Residence: categórico
- Gender: categórico
- Education Level: categórico
- Age Range: categórico
- Previous Completed Courses: categórico
- Date Enrollment: ordinal y secuencial (solo fechas mayores a 2010)
- Start Date: cuantitativa y secuencial (solo fechas mayores a 2010)
- Last Update: cuantitativa y secuencial (solo fechas mayores a 2010)

Para la tarea principal número 3, se utiliza otro dataset de tipo tabla con disponibilidad estática, que contiene las actividades (ítems) que van realizando los estudiantes durante el curso. Se utilizan los siguientes atributos:
- Student ID: ordinal y secuencial
- Item Name: categórico
- Item Sequence: cuantitativo y secuencial
- State: categórico (Started y Completed)

También se utiliza otro dataset de tipo tabla con disponibilidad estática, que contiene la información de los usuarios del curso que realizan actividades. Se utilizan los siguientes atributos:
- Uniandes_user_id: ordinal y secuencial
- Reported_or_inferred_gender: categórico (mujer, hombre y desconocido)

De igual manera, se utiliza otro dataset de tipo tabla con disponibilidad estática, que contiene la información de los feedbacks de cada actividad que proporciona el usuario. Se utilizan los siguientes atributos:
- Course_item_id: ordinal y secuencial
- Feedback_rating: categórico ("Pulgares hacia arriba" y "Pulgares abajo")

De manera complementaria haremos uso de las encuestas iniciales y finales que toman los estudiantes para agregar información al perfil demográfico o profesional. El dataset de tipo tabla se compone de:
- Student ID: ordinal y secuencial (Llave con los otros datasets)
- Fecha Actualización:  ordinal y secuencial
- Pregunta: Categórico
- Respuesta: Depende de la pregunta, las posibles respuestas pueden ser: Categóricas u Ordinales Secuenciales.

Por último, para cumplir con las tareas principales de la visualización, se derivarán los siguientes atributos:
- Grade Level: categórico, derivado a partir de Grade Note
- Activity Level: categórico, derivado a partir la cantidad de Items que vea un estudiante durante el curso
- Daily Inscriptions: cuantitativa y secuencial

El resultado de las encuestas es la data que apoya la tarea principal.

## Objetivos del Proyecto - Why

### Tareas Principales
- TP1: Identificar las características que indican que el MOOC es efectivo y que realmente mejora las competencias y capacidades para hablar de “Sexualidad” en los participantes, aunque no cuente con un profesor de forma presencial (Identify – Features).
- TP2: Descubrir la distribución de las variables demográficas de los estudiantes que completan el curso, para identificar cuales comunidades demuestran mayor interés en realizar y terminar del curso (Discover - Distributions).
- TP3: Identificar las actividades más populares y las menos populares de las disponibles en el curso, contrastando la cantidad de veces que una actividad fue completada contra la cantidad de veces que una actividad no fue completada (Part-to-whole relationship) (Find/search - Trends) y (Lookup - Values).

### Tareas Secundarias
1. Determinar si existe alguna actividad o ítem en la cual los estudiantes se retiran del curso de manera frecuente, de tal manera que se logre identificar un momento clave de deserción (Locate - Outliers).
2. Explorar la distribución y el conteo de los estudiantes a nivel global, teniendo en cuenta que el curso se dicta en línea (Explore - Distribution).
3. Perfilar los usuarios del curso, y lograr identificar las poblaciones más activas (Compare-Features).
4. Encontrar las épocas o rangos de fechas de mayor inscripción de estudiantes, con el fin de fortalecer y enfocar hacia determinadas poblaciones las campañas de marketing del curso, de tal manera que se logre aumentar el índice de participación anual (Locate - Outliers).
5. Identificar las actividades (ítems) más populares y las menos populares de las disponibles en el curso, a través de su calificación de tipo Like/Dislike (Find/search - Trends) (Lookup - Values).
6. Identificar las actividades más populares y las menos populares de las disponibles en el curso, a través de la cantidad de interacciones que tiene cada ítem, donde cada actividad que es iniciada tiene un estado de “iniciada” y cada actividad iniciada que es completada por el usuario de cambia de estado a “completada”. La actividad puede ser iniciada y completada muchas veces por un mismo usuario. (Find/search - Trends) (Lookup - Values).
7. Identificar las actividades (ítems) más populares y las menos populares de las disponibles en el curso, contrastandolo contra el genero o sexo (Find/search - Trends) (Lookup - Values).

## Marcas y Canales – How
En el proceso de definición de la visualización, teniendo en cuenta las tareas seleccionadas y los datos, se realizó la propuesta del HOW la cual consta de los modismos descritos a continuación:

Modismo para la TP1, compuesto por 2 gráficos (un bar chart a la izquierda y un multi series line chart) yuxtapuestos:
- Marcas: para el bar chart, líneas verticales y para el ms line chart, puntos unidos por líneas.
- Canales: longitud en el eje Y para expresar cantidad (de estudiantes en el bar chart y de expectativa para el ms line chart) y color hue para diferenciar las categorías de las variables (curvas).
- How-Encode: para el bar chart arrange express en el eje Y, y en el eje X, separate, order y align para las posibles respuestas de las encuestas. Para el ms line chart, arrange express para ambos ejes.
- How-Face: juxtapose de los 2 gráficos (bar chart y multi series line chart).
- How-Reduce: los datos pueden ser reducidos a partir de un conjunto de filtros comunes, por: género, país de residencia, horas dedicadas y nivel educativo.
- Coordinate views: multiform, ya que usan los mismos datos, pero con diferente encoding.
- Descripción: este modismo está compuesto por 2 gráficos yuxtapuestos, que ayudan a identificar características o patrones que muestren la relevancia del presente MOOC.

Modismo para la TP2, Stacked Bar Chart Vertical, Horizontal BarChart, Bubble chart y Map view:
- Marcas: líneas verticales y Areas (Circulos).
- Canales: longitud y Area 2D para expresar la cantidad de estudiantes. Color (Hue) para separar las categorías en las variables demográficas Sexo, Área de trabajo, Rango de edad. El eje Y está ordenado de forma express. Área para expresar el volumen de estudiantes por sexo. Área para cantidad de estudiantes y ubicación espacial en el mapa por país de residencia del estudiante
- How-Encode: agrupación de las poblaciones por cuartiles en rangos de porcentaje para la completitud de actividades. Separate, order & align.
- How-Manipulate: change.
- How-Reduce: aggregate.
- Descripción: se presenta la cantidad de estudiantes en el eje Y, agrupada por cuartiles y se complementa con la volumetría en cada variable demográfica.

Modismo para la TP3, un Stacked bar chart y Normalized stacked bar chart:
- Data: Tabla de múltiples dimensiones, 2 atributos categóricos, 1 atributo cuantitativo.
- Data derivada para Normalized stacked bar chart: 1 atributo cuantitativo, que es la versión normalizada del atributo original.
- Marcas: líneas apiladas horizontalmente
	- Glyph: objeto compuesto de sub-barras de diferentes colores encima de cada una. Solamente para el Normalized stacked bar chart, se estira cada una de las barras para la longitud máxima posible mostrando porcentajes en lugar de conteos absolutos. Para el stacked bar chart se muestran valores absolutos.
- Canales:
	- Longitud para expresar valores cuantitativos
	- Hue, color: para expresar categorías
	- Región espacial: una por marca
	- Alineada: La categoría o componente más bajo de la barra apilada (para ambos, stacked bar chart y normalized stacked bar chart).
	- No alineada: otros componentes de la barra o sub-barras.
	- Para el normalized stacked bar chart se utiliza la versión normalizada del atributo original
	- Existen dos formas de ordenar, una es por orden en que las actividades son presentadas en Coursera y la segunda es por cantidades del atributo cuantitativo.
- Tarea principal: (Part-to-whole relationship) y para la versión normalizada (part-to-whole judgements). La suma de los atributos cuantitativos por categoría debe coincidir con los datos normalizados, tales como porcentajes, donde las partes deben sumar hasta el 100%. También se puede utilizar una sola barra en un gráfico de barras apiladas normalizadas para mostrar esta propiedad con el canal más preciso de juicios de longitud.
- How-Manipulate – Change the order, para mostrar actividades más populares que nunca fueron terminadas, contra interacciones que el usuario realiza sobre las actividades, el sexo o genero del usuario contra las actividades y feedback de los usuarios sobre las actividades, ordenando todas las agregaciones de dos formas: 
	- Por cantidades de manera descendente o por orden en que las actividades son presentadas en el MOOC de Coursera.
- How-Manipulate: (Select elements (activities and categories) with hover), para mostrar totales (ejemplo, total por categoría o total por actividad) y data que no cabe en la pantalla (ejemplo, ruta del módulo, a la lección y de la lección a la actividad), mediante un infotip compuesto.
- How-Encode: (Separate, order and align with 2 keys matrix), para dos llaves del dataset proyectados sobre stacked bar charts y normalized stacked bar chart.

Con respecto a los modismos para las tareas secundarias:
- Para la tarea secundaria 1, se propone un bar chart vertical, que contabilice (summarize) cual fue la última actividad realizada por cada estudiante, a fin de identificar si existe una actividad en donde un grupo importante de estudiantes se retira del curso. Las marcas serán líneas verticales, y los canales será longitud para expresar la cantidad de estudiantes que llegaron a dicha actividad. El eje Y estará ordenado de forma express, y el eje X usará separete, order y align para posicionar las barras.
- Para las tareas secundarias de la 2 y 3, se propone como modismos el uso de Stacked Bar Chart Horizontal (Normalized), similar al propuesto para la tarea principal 3.
- Para la tarea secundaria 4, se propone usar un modismo compuesto por un Calendar View y un Line Chart. En el Calendar View se resumirán las tendencias de todos los años, mientras que en el Line Chart, se mostrará información sólo para 1 año en específico. Además, el Line Chart, mostrará líneas del tipo dash que corten el eje Y, para definir las zonas de tolerancia a partir de las cuales, se identifican los outliers. Los datos de ambos gráficos estarán ordenados de forma express sobre el eje X. También estarán ordenados y alineados en el eje Y, con respecto a la cantidad de inscripciones por fecha. El line chart será actualizado, a partir de una interacción del tipo Select sobre un combo box.

## Insights
A continuación, se listan los insights más importantes de la tarea principal 1 y sus tareas secundarias:
- I1: A partir de las encuestas realizadas, se observa la efectividad del MOOC en los estudiantes, ya que antes de cursarlo tienen un conocimiento y expectativas sobre el tema entre regular y bueno (2.5/5.0 en promedio), pero luego de cursarlo, mejora su conocimiento entre muy bueno o excelente (4.5/5.0 en promedio).
- I2: Los estudiantes que dedicaron más horas de estudio al MOOC (5 o más) manifestaron que su conocimiento sobre la sexualidad mejoró en mayor porcentaje, que los que dedicaron pocas horas al curso (4 o menos), específicamente, casi un 10% de mayor conocimiento sobre el tema.
- I3: La tendencia histórica de las inscripciones es muy positiva, ya que hasta el año 2016, para ningún día se había pasado de 50 inscripciones, sin embargo, a partir del 2016, a mediados de febrero y de julio hay picos con más de 100 inscripciones. Sin embargo, lo único preocupante es que para el 2018 la cantidad de inscripciones diarias ha bajado con respecto al 2016 y el 2017.

A continuación, se listan los insights más importantes de la tarea principal 2 y sus tareas secundarias:
- I4: A pesar de que en principio se pensaba que el balance de hombres y mujeres participantes en el curso era similar, e incluso, que la población masculina podría llegar a ser mayor, hemos detectado que son las mujeres quienes más se interesan por los contenidos del MOOC, y no solamente por curiosear, son las más juiciosas para completar las actividades del curso, superando a los hombres 2.5 veces en participación.
- I5: La población más interesada en los contenidos del curso, son profesionales de la salud y las ciencias sociales, que se encuentran entre los 18 y 44 años, siendo el área de lenguaje y humanidades protagonista con más del 50% de la población. 
- I6: Hemos encontrado un comportamiento particular con el volumen de inscripciones durante los 3 años que lleva el curso en línea, en donde principalmente el volumen de inscritos a venido descendiendo, sin embargo, existen unos puntos en el tiempo donde se disparan las inscripciones, como es el caso del 10 de junio de 2017, fecha inmediatamente posterior a una publicación en revista, evidenciando la efectividad de estas campañas publicitarias.

A continuación, se listan los insights más importantes de la tarea principal 3 y sus tareas secundarias:
- I7: Existe una tendencia de entre un 41% para la actividad más popular y un 56% para la actividad menos popular de no completar la actividad.
- I8: Existe correlación entre la cantidad de usuarios por sexo o género, con respecto al uso de estos por actividad. Las mujeres ocupan el primer lugar con un total de 50.248 usuarios, los que no reportaron sexo ocupan el segundo lugar con 18.388 usuarios, los hombres son los que menos ven el curso con un total de 18.223 usuarios. Anteriormente se creía que la mayoría de los usuarios eran hombres.
- I9: 99.1% de los votos del feedback del curso es positivo.
- I10: I4: De los 86.859 usuarios que aparecen en la base de datos, la mayoría son mujeres con un 54% de utilización para la actividad menos popular y un 69% para la más popular.

## Tecnologías Usadas
Para el desarrollo del proyecto se usaron las siguientes tecnologías:
- Se usó Sublime Text 3 como IDE de desarrollo.
- HTML y CSS, para maquetar el sitio web.
- Javascript y el framework d3.js para crear los gráficos (de barras y de líneas) y la respectiva interacción con ellos.
- Tableau para realizar los gráficos de la tarea principal 2.
- GitHub para almacenar el código de la Viz y de los datos usados.

## Prerrequisitos y Uso
El proyecto sólo depende del acceso a los datos almacenados en el repositorio y a la disponibilidad del servicio de GitHub Pages.

## Autores
El autor de los datos es COURSERA y los estudiantes que diligenciaron sus encuestas, los datos están actualizados hasta octubre del 2018.

Los autores de la visualización son Segura Tinoco, Andres, Juan Carlos Oyuela y <a href="https://github.com/vladcuevas" target="_blank">Cuevas Saavedra, Vladimir</a>.

## Screenshots
A continuación, se presentan unos pantallazo del proyecto:

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura1.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura2.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura3.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura4.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura5.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura6.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura7.PNG)

![alt text](https://raw.githubusercontent.com/ansegura7/VA_FinalProject_MOOC/master/screenshots/Figura8.PNG)

## Licencia
Este proyecto está bajo la licencia MIT.
