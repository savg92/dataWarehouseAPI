# Delilah Resto API
 Esté proyecto plantea la creación de un sistema de gestion de clientes/contactos para una empresa. <br>
 Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modificaciones y obtención de información sobre una estructura de datos que podría consumir un cliente.

## Instrucciones
Instrucciones que permitirán la utilización de una copia de los archivos de forma local en tu computadora.

### Requisitos basicos
- Tener instalado NodeJS.
- Tener instalado MySQL.

### Instalacion
- Instalar las dependencias, base de datos, migraciones. Ejecutando:
  ```
  npm install
  npx sequelize db:create
  npx sequelize db:migrate
  npx sequelize-cli db:seed:all
  ```
- Siguiendo el ejemplo existente en el archivo **.env.example**. <br>
  Crear un archivo ***.env*** en la raíz del proyecto y crear las variables del entorno a gusto.
- Abrir el archivo ***config.json*** ubicado en ***/dataWarehouseAPI/config/*** y modifica las variables _username_ y _password_ de la sección ***development***, a las correspondientes a tu base de datos.
- Instalar la dependencia Nodemon para un uso continuo de la API (recomendado) (en dado caso de no isntalarse, se debera modificar el archivo ***package.json***)
  ```
  npm i nodemon
  ```
- Ejecuta el siguiente comando para iniciar el servidor node del proyecto
  ```
  npm run start
  ```
- En caso de querer sumistrar datos de ejemplo a la base de datos Delilah Resto, ejecuta
  ```
  npx sequelize-cli db:seed:all
  ```

## Documentación
La documentación de la API puede encontrarse en el archivo **dataWarehous.yaml** presente en el directorio raíz del repositorio.
Para mejor visualización, puedes ingresar a [swagger](https://editor.swagger.io/#).

Tambien se agregó el archivo **dataWarehouse.postman_collection.json** en el directorio raíz del repositorio para ser importado en POSTMAN; este ya contiene todas las rutas de la API.

Para iniciar las prubas de la API, se recomienda iniciar usando:
- El usuario ***ADMIN***.<br>
  ***email:*** admin@admin.com <br>
  ***password:*** 123

### Endpoints
La url base es 
127.0.0.1:{{port}}

La API cuenta con los siguientes endpoints:
- /api/login
<br>(Los siguientes endpoints requieren del Bearer token, otorgado en el login)
- /api/logout
- /api/users
- /api/users/:id
- /api/channels
- /api/channels/:id
- /api/cities
- /api/cities/:id
- /api/companies
- /api/companies/:id
- /api/contactsChannels
- /api/contactsChannels/:id
- /api/contacts
- /api/contacts/:id
- /api/countries
- /api/countries/:id
- /api/regions
- /api/regions/:id

## Construido con

Herramientas y/o paquetes usados en el proyecto:

- [NodeJS](https://nodejs.org/en/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [debug](https://www.npmjs.com/package/debug)
- [express](https://www.npmjs.com/package/express)
- [express-jwt](https://www.npmjs.com/package/express-jwt)
- [hbs](https://www.npmjs.com/package/hbs)
- [helmet](https://www.npmjs.com/package/helmet)
- [http-errors](https://www.npmjs.com/package/http-errors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [express-generator](https://www.npmjs.com/package/express-generator)
