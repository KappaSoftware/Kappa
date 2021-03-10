# Arquitectura de Servicios

Este documento describe el diseño funcional de la infraetructura de servicios de KappaSoftware.

El diseño general comprende los siguientes componentes:

- **Node.js**: también llamado "backend", es el núcleo de funcionamiento del sistema. Este componente es el encargado de obtener y enrutar la información que necesita todo el sistema.
- **React**: también llamado "frontend", es el componente encargado de construir la interfaz gráfica de usuario, principalmente la interfaz web.
- **LeafLet**: librería desarrollada en JavaScript con las funciones relacionadas con la localización geográfica y la construcción de mapas.
- **MongoDB**: servicio de Base de Datos en el cual se almacena toda la información persistente del servicio.
- **Telegram-bot**: Componente de interoperabilidad con la red social Telegram.
- **DNS**: servicio de resolución de nombres para abstraer las rutas de acceso entre los host donde se encuentran los componentes y en algunos casos puede proveer balanceo de carga.

Junto a los componentes anteriores, se añaden los siguientes servicios externos con los cuales se vincula el sistema para extender sus funcionalidades:

- **Telegram**: Red social de mensajería instantánea, usada por KappaSoftware para la interacción con clientes que pueden desde su interfaz consultar y añadir registros.
- **OpenStreetMap**: Servicio de Mapas y localización geográfica con API pública y posibilidad de hacer implementaciones locales, privadas y parciales del servicio.

En la siguiente imagen se pueden observar estos elementos y la forma en la que interoperan:

![Diseño General de Servicios](https://github.com/KappaSoftware/Kappa/blob/main/imagenes/dise%C3%B1o-de-servicios.png)

El diseño propuesto permite ajustar la capacidad de cómputo y respuesta en función de la demanda desde los clientes de cada servicio, de manera de proveer balanceo de carga y alta disponibilidad, a su vez permitiendo la escalabilidad del sistema ante el aumento de peticiones externas e internas. La siguiente imagen ilustra el esquema de funcionamiento de esta escalabilidad:

![Diseño de Nube](https://user-images.githubusercontent.com/37819159/108674321-7bd20580-74bb-11eb-860e-9e1b73b398d2.png)

Estas partes que comprenden el funcionamiento de KappaSoftware tienen formas distintas de implementarse para permitir escalabilidad, balanceo de carga y tolerancia a fallos:

- Los componentes que se comunican mediante el protocolo HTTP(s) estarán dispuestos dentro de máquinas virtuales (KVM) o contenedores (Docker) a las cuales se acceden a través de proxys reversos (Nginx o Apache) que fungen a su vez como directores para el balanceo de carga.
- La Base de Datos (MongoDB) usa el esquema propio sugerido por la documentación oficial de ese servicio para proveer las funciones de LB/HA.
- El Bot de Telegram usa un esquema de cluster Activo-Pasivo para proveer estas funciones, ya que el lenguaje escogido (Python3) y la librería con la cual interopera con la API de esta red social no comprende ni permite paralelizar su funcionamiento.

A continuación se describe en detalle el esquema de funcionamiento para LB/HA de cada uno de los componentes:

## Base de Datos (MongoDB)

Vínculo a la Documentación Oficial donde se describe el funcionamiento de este servicio en cluster: https://docs.mongodb.com/manual/tutorial/deploy-shard-cluster/

MongoDB funciona en cluster mediante la creación de instancias "mongos" e instancias "mongod", los cuales son los componentes de la Base de Datos que proveen los servicios de enrutamiento (directores del cluster), servicios de configuración (autenticación y parámetros de funcionamiento del cluster) y réplicas (instancias con copias exactas de la data almacenada).

En la siguiente imagen (tomada de https://github.com/minhhungit/mongodb-cluster-docker-compose) se puede observar el esquema de funcionamiento de MongoDB en una implementación en cluster:

![MongoDB Cluster](https://raw.githubusercontent.com/minhhungit/mongodb-cluster-docker-compose/master/images/sharding-and-replica-sets.png)

Sumado al diseño anterior, hay que añadir los esquemas de seguridad y control de acceso a los clientes del servicio. Para esto se definen *Roles de Autorización* (ver https://docs.mongodb.com/manual/core/authorization/) o alternativamente se configura un mecanismo de *Autenticación Interna* (ver https://docs.mongodb.com/manual/core/security-internal-authentication/). Para el momento de redacción de este documento aún es necesario evaluar cuál de los dos métodos es el mas indicado o si ambos deben ser implementados en función de las necesidades de cada componente dentro del diseño final del sistema.

En el siguiente vínculo se describe en detalle una receta de implementación usando el esquema anteriormente descrito: https://github.com/minhhungit/mongodb-cluster-docker-compose

## NodeJS: Backend y Frontend

El funcionamiento por defecto que provee NodeJS para paralelizar procesos, en principio, se realiza usando un solo proceso en un solo host. Para añdir subprocesos en el mismo host que puedan atender simultáneamente peticiones en paralelo, define un proceso "maestro" y explícitamente en el código se deben definir una serie de "workers" o procesos secundarios, lo cual requiere realizar estáticamente sentencias "if-else" dentro del código fuente de la aplicación, según se indica en la documentación oficial: https://nodejs.org/api/cluster.html 

Alternativamente, existe el desarrollo de un daemon PM2 que hace posible crear procesos secundarios transparentemente (ver https://pm2.keymetrics.io/docs/usage/quick-start/)

En ambos casos (usando la clusterización en el código o mediante el daemon PM2), se tiene un esquema de funcionamiento como el que se ilustra en la siguiente imagen, para cada nodo de backend o frontend (tomado de https://medium.com/iquii/good-practices-for-high-performance-and-scalable-node-js-applications-part-1-3-bb06b6204197):

![NodeJS Cluster](https://miro.medium.com/max/590/1*p6YEK7y6JsVYBaZkhu4UbQ.png)

Cualquiera sea el modo en el cual se atiendan peticiones en paralelo en un host, para crear un cluster de nodos de NodeJS se recomienda el uso de un Proxy Reverso (implementado con Apache o Nginx), el cual se coloca ante los clientes (interno o externos, dependiendo del componente requerido) para atender las peticiones y como director del cluster este servicio administra en el esquema de balanceo de carga escogido (roundrobin, por disponibilidad de respuesta, etc) y enruta las conexiones hacia un nodo y este a su vez al subproceso correspondiente:

![NodeJS Horizontral](https://miro.medium.com/max/796/1*ryiL00dESNJTL_jRnUyAyA.png)


## Telegram Bot

El desarrollo del bot de telegram usa Python3 como lenguaje de programación y la librería (https://github.com/python-telegram-bot/python-telegram-bot) la cual contiene las funciones para la integración con la API de Telegram. Esto condiciona especialmente el diseño de funcionamiento para trabajar en cluster, ya que explícitamente se restringe la ejecución simultánea de mas de una instancia vinculada a la API de esta red social (ver https://telegram.org/faq#p-puedo-ejecutar-telegram-usando-mi-propio-servidor).

Asimismo, la clusterización de instancias de un proceso en distintos hosts no es una funcionalidad propia del lenguaje de programación Python (tanto en las versiones 2.x y 3.x) de manera que se requiere un desarrollo adicional que se coloque sobre este servicio para poderlo sindicar dentro una estructura de cluster.

Por estas razones, la solución propuesta resuelve la alta disponibilidad, pero no contempla el balanceo de carga:

Se creará un esquema de cluster activo-pasivo usando Pacemaker y Corosync (ver https://wiki.debian.org/Debian-HA/ClustersFromScratch) donde es posible la existencia de múltiples nodos pero restringiendo la ejecución simultánea, de manera que existirá sólo un nodo activo y en caso de alguna falla se llevará a cabo un relevo automático de la instancia que presenta el error, enrutando las peticiones hacia un nuevo nodo activo e inmediatamente activando una acción de STONITH sobre el inactivo.

**TODO: imagen del esquema activo-pasivo**

## DNS

**TODO**










