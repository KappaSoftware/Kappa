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

![Diseño General de Servicios](https://github.com/KappaSoftware/Kappa/blob/main/imagenes/doc/dise%C3%B1o-de-servicios.png)

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

![Cluster para BOT de Telegram](https://github.com/KappaSoftware/Kappa/blob/main/imagenes/doc/bot-telegram-cluster.png)

El diseño de cluster propuesto para este componente consta de 3 nodos, de manera de poder configurar un diseño que prevenga las situaciones de split-brain, ya que de esta manera se puede asegurar que ningún nodo pueda operar si no ve al menos uno mas activo. Como nota de recordatorio, se necesita diseñar y configurar el método para activar STONITH a las máquinas virtuales o contenedores en los cuales se estén ejecutando nodos que requieran ser desactivados.

## DNS

El diseño para la resolución de nombres no presenta mayor diferencia con el propio que contiene el funcionamiento de un servicio DNS: se define una zona de autoridad, con 2 o mas nodos entre los cuales se realiza una transferencia de zona del dominio donde se asignan los hosts.

La única característica a añadir es la posible definición de punteros "srv" que eventualmente puedan asignar respuestas en "round robin" sobre los servicios que puedan responder de manera indistinta a los clientes, como es el caso de las instancias HTTP (backend y frontend) que se definen en la sección anterior correspondiente. Esto es necesario que sea evaluado, pues el módulo de proxy reverso que brinda Apache y Nginx ya contiene esta funcionalidad y es posible que no sea recomendable o necesario redundar la alternabilidad.

# Recetas de Instalación

En esta sección se especifican los pasos a seguir para instalar, configurar e implementar los servicios enumerados en este documento, con el diseño de alta disponibilidad y balanceo de carga para cada caso.

Se usará el Sistema Operativo GNU/Linux para cada host donde se instancie algún componente de los servicios propios de Kappa. En específico la distribución Debian, versión 10 (nombre código "Buster"), por ser la versión estable para el momento de realizar esta implementación.

## MongoDB

La documentación oficial de MongoDB (ver https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/) recomienda no usar la versión instalables desde el administrador de paquetes de la distribución, sino en cambio usar los publicados en el repositorio de los desarrolladores:

```bash

apt update

apt upgrade

apt install gnupg2

wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

apt update

apt install -y mongodb-org

```

Para prevenir que en el futuro se actualice la versión estable que se descsarga al momento de realizar la instalación, se recomienda ejecutar:

```bash
echo "mongodb-org hold" | dpkg --set-selections
echo "mongodb-org-server hold" | dpkg --set-selections
echo "mongodb-org-shell hold" | dpkg --set-selections
echo "mongodb-org-mongos hold" | dpkg --set-selections
echo "mongodb-org-tools hold" | dpkg --set-selections
```

Luego se inicia el servicio y se configura el daemon para que se levante cada vez que el sistema operativo reinicie:

```bash

systemctl start mongod

systemctl status mongod

systemctl enable mongod
```

En la configuración por defecto, el servicio sólo permite conexiones desde localhost, por lo que se requiere modificar el archivo /etc/mongod.conf de tal manera que las líneas relacionadas con networking queden de la siguiente manera:

```bash
net:
  port: 27017
  bindIp: 0.0.0.0
```

**NOTA:** esto es un fix inicial, la configuración de control de acceso debe hacerse mediante "Usuarios y Roles":

	- https://docs.mongodb.com/manual/tutorial/enable-authentication/
	- https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/

**TODO: Cluster**

## Backend: NodeJS

**Instrucciones para instalar el Backend en DEBIAN 10 (buster):**

Instalación de NODE.JS y express-generator
```
su -
apt update
curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
apt install nodejs npm
npm install express-generator -g
express app-tets
```

Se instalan las dependencias de express-generator (como usuario regular)
```
cd app-test
npm install
```

Configurar NODE para ejecutar nodemon en su lugar

```
su -
npm install -g nodemon

# Como usuario regular se modifica NODEJS

vim package.json
{
  "name": "app-test",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"   <---- se cambia "node" por "nodemon"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}

# También como usuario regular se cambia el puerto de NODEJS para que responda en uno distinto al FRONTEND:

vim bin/www

var port = normalizePort(process.env.PORT || '3001');
```

Probamos la instalación de NODE:
```
$ npm start

$ firefox http://localhost:3001

# CONTROL-C para salir
```

Se instala el FRONTEND (REACT) en la ruta "front-test". Esto se realiza como usuario regular para que sea una librería local:
```
 npx create-react-app front-test
```

Para probar se levanta el servicio del FRONTEND
```
cd front-test
npm start

# CONTROL-C para salir

```

Creamos el ambiente de producción, así el FRONTEND serán páginas estáticas:
```
npm run build
```

Configuramos el FRONTEND para reenviar todas la peticiones al BACKEND:
```
cd ..
vim app.js

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'front-test/build')));

cd front-test
vim package.json
  "proxy": "http://localhost:3001",

```

## Frontend: React + Leaflet




## Telegram BOT

**TODO**

## DNS









## NOTAS (sección temporal)

Conectado a la instancia remota usando el siguiente comando:

```bash
mongo mongodb+srv://admin:XV1CLDFp7dumBnEn@kappa.qosht.mongodb.net/KappaDB?authSource=admin
```

Respuesta:
```
MongoDB shell version v4.4.4
connecting to: mongodb://kappa-shard-00-00.qosht.mongodb.net:27017,kappa-shard-00-01.qosht.mongodb.net:27017,kappa-shard-00-02.qosht.mongodb.net:27017/KappaDB?authSource=admin&compressors=disabled&gssapiServiceName=mongodb&replicaSet=atlas-zg30h5-shard-0&ssl=true
Implicit session: session { "id" : UUID("bcacd754-1697-4b95-966c-a99cfde55922") }
MongoDB server version: 4.4.4
Error while trying to show server startup warnings: user is not allowed to do action [getLog] on [admin.]
```

Solicitando status de la replica:
```
MongoDB Enterprise atlas-zg30h5-shard-0:PRIMARY> rs.status()
{
	"set" : "atlas-zg30h5-shard-0",
	"date" : ISODate("2021-03-26T01:25:49.844Z"),
	"myState" : 1,
	"term" : NumberLong(12),
	"syncSourceHost" : "",
	"syncSourceId" : -1,
	"heartbeatIntervalMillis" : NumberLong(2000),
	"majorityVoteCount" : 2,
	"writeMajorityCount" : 2,
	"votingMembersCount" : 3,
	"writableVotingMembersCount" : 3,
	"optimes" : {
		"lastCommittedOpTime" : {
			"ts" : Timestamp(1616721949, 2),
			"t" : NumberLong(12)
		},
		"lastCommittedWallTime" : ISODate("2021-03-26T01:25:49.497Z"),
		"readConcernMajorityOpTime" : {
			"ts" : Timestamp(1616721949, 2),
			"t" : NumberLong(12)
		},
		"readConcernMajorityWallTime" : ISODate("2021-03-26T01:25:49.497Z"),
		"appliedOpTime" : {
			"ts" : Timestamp(1616721949, 2),
			"t" : NumberLong(12)
		},
		"durableOpTime" : {
			"ts" : Timestamp(1616721949, 2),
			"t" : NumberLong(12)
		},
		"lastAppliedWallTime" : ISODate("2021-03-26T01:25:49.497Z"),
		"lastDurableWallTime" : ISODate("2021-03-26T01:25:49.497Z")
	},
	"lastStableRecoveryTimestamp" : Timestamp(1616721909, 8),
	"electionCandidateMetrics" : {
		"lastElectionReason" : "stepUpRequestSkipDryRun",
		"lastElectionDate" : ISODate("2021-03-24T12:18:13.718Z"),
		"electionTerm" : NumberLong(12),
		"lastCommittedOpTimeAtElection" : {
			"ts" : Timestamp(1616588292, 1),
			"t" : NumberLong(11)
		},
		"lastSeenOpTimeAtElection" : {
			"ts" : Timestamp(1616588292, 1),
			"t" : NumberLong(11)
		},
		"numVotesNeeded" : 2,
		"priorityAtElection" : 7,
		"electionTimeoutMillis" : NumberLong(5000),
		"priorPrimaryMemberId" : 1,
		"numCatchUpOps" : NumberLong(0),
		"newTermStartDate" : ISODate("2021-03-24T12:18:16.117Z"),
		"wMajorityWriteAvailabilityDate" : ISODate("2021-03-24T12:18:16.357Z")
	},
	"members" : [
		{
			"_id" : 0,
			"name" : "kappa-shard-00-00.qosht.mongodb.net:27017",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 133768,
			"optime" : {
				"ts" : Timestamp(1616721948, 11),
				"t" : NumberLong(12)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1616721948, 11),
				"t" : NumberLong(12)
			},
			"optimeDate" : ISODate("2021-03-26T01:25:48Z"),
			"optimeDurableDate" : ISODate("2021-03-26T01:25:48Z"),
			"lastHeartbeat" : ISODate("2021-03-26T01:25:48.634Z"),
			"lastHeartbeatRecv" : ISODate("2021-03-26T01:25:48.193Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncSourceHost" : "kappa-shard-00-02.qosht.mongodb.net:27017",
			"syncSourceId" : 2,
			"infoMessage" : "",
			"configVersion" : 1,
			"configTerm" : 12
		},
		{
			"_id" : 1,
			"name" : "kappa-shard-00-01.qosht.mongodb.net:27017",
			"health" : 1,
			"state" : 2,
			"stateStr" : "SECONDARY",
			"uptime" : 133465,
			"optime" : {
				"ts" : Timestamp(1616721949, 2),
				"t" : NumberLong(12)
			},
			"optimeDurable" : {
				"ts" : Timestamp(1616721949, 2),
				"t" : NumberLong(12)
			},
			"optimeDate" : ISODate("2021-03-26T01:25:49Z"),
			"optimeDurableDate" : ISODate("2021-03-26T01:25:49Z"),
			"lastHeartbeat" : ISODate("2021-03-26T01:25:49.838Z"),
			"lastHeartbeatRecv" : ISODate("2021-03-26T01:25:48.480Z"),
			"pingMs" : NumberLong(0),
			"lastHeartbeatMessage" : "",
			"syncSourceHost" : "kappa-shard-00-02.qosht.mongodb.net:27017",
			"syncSourceId" : 2,
			"infoMessage" : "",
			"configVersion" : 1,
			"configTerm" : 12
		},
		{
			"_id" : 2,
			"name" : "kappa-shard-00-02.qosht.mongodb.net:27017",
			"health" : 1,
			"state" : 1,
			"stateStr" : "PRIMARY",
			"uptime" : 133832,
			"optime" : {
				"ts" : Timestamp(1616721949, 2),
				"t" : NumberLong(12)
			},
			"optimeDate" : ISODate("2021-03-26T01:25:49Z"),
			"syncSourceHost" : "",
			"syncSourceId" : -1,
			"infoMessage" : "",
			"electionTime" : Timestamp(1616588293, 1),
			"electionDate" : ISODate("2021-03-24T12:18:13Z"),
			"configVersion" : 1,
			"configTerm" : 12,
			"self" : true,
			"lastHeartbeatMessage" : ""
		}
	],
	"ok" : 1,
	"$clusterTime" : {
		"clusterTime" : Timestamp(1616721949, 2),
		"signature" : {
			"hash" : BinData(0,"G9VovWa3+KkNz6u0c+8UlPjoSoM="),
			"keyId" : NumberLong("6927588072976547842")
		}
	},
	"operationTime" : Timestamp(1616721949, 2)
}
```

