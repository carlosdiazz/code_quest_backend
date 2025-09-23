# CODE QUEST 2025 - Backend

Nosotros somos **DevCaribe**, este es el **backend** del proyecto **Blog Comunitario** para el desafío **CODE QUEST 2025** organizado por **Fernando Herrera**.

La aplicación está desarrollada con **NestJS**, utiliza **PostgreSQL** como base de datos, **TypeORM** como ORM, **GraphQL** para la comunicación y **Fastify** para mejorar el rendimiento. La autenticación y autorización se manejan mediante **Firebase** y para la comunicacion continua implementamos WebSocket usando ***Socket.io***

> ⚠️ Este repositorio corresponde únicamente al **backend** del proyecto.

---

## Tecnologías utilizadas

- **NestJS** - Framework principal del backend
- **Fastify** - Servidor de alto rendimiento
- **GraphQL** - Comunicación cliente-servidor
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Firebase** - Autenticación y autorización
- **Docker / Docker Compose** - Opcional para levantar la base de datos
- **Socker.io** - WebSocket
- **CloudDinary** - Para guardar y servir las imagenes

---

## Requisitos

- Node.js v20+
- npm v9+
- PostgreSQL (local o en la nube)
- Docker (opcional)
- Cuenta de Firebase Auth (Provider de Google y Correo habilitado)
- Cuenta de CloudDinary

---

## Code Quest Backend - Guía de Configuración

### Desarrollo

#### 1. Base de Datos

Subir una base de Dato Postgres, ya sea local o en la nube

#### 2. Firebase

1. Crear un proyecto en Google Cloud.
2. Habilitar Firebase Auth y configurar la autenticación.
3. Como metodos de autenticacion usamos el del Correo y el de Google

#### 3. CloudDinary

1. Crear una cuenta en CLoudDinary
2. Obtener las variables de configuracion de CloudDinary

#### 4. Instalación de dependencias

```bash
npm install
```

#### 5. Variables de entorno

Clonar el archivo `template.env` como `.env`:

```bash
cp template.env .env
```

Configurar las variables según la base de datos que se use y otras configuraciones (puerto, etc.).

#### 6. Correr la Primera Migracion en al base de Datos

Ejecutar la primera migración para crear las tablas en la base de datos:

```bash
npm run migration:run
```
#### 7. Correrlo en modo desarrollo

Levantar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:{PUERTO}/graphql` para interactuar con GraphQL Playground.

## Cargar datos de prueba (Seed)

Para poder ejecutar el *Seed*, lo primero que necesitas es:

1. **Crear una cuenta de usuario** en el sistema.
2. **Asignarle el rol de ADMIN** a ese usuario, para el primer usuario es obligatorio que lo cambies manual, desde la BD, solo el primer usuario.

> ⚠️ **Importante:** Solo un usuario con rol **ADMIN** puede ejecutar la consulta del Seed.

---

### Ejecución del Seed

Una vez tengas un usuario con rol **ADMIN** y su respectivo **token**, puedes ejecutar la siguiente consulta **GraphQL**:

```graphql
query ExecSeed {
  execSeed {
    error
    message
  }
}
```

---

### ¿Qué hace esta consulta?

Al ejecutarla, se generará automáticamente data de ejemplo utilizando **Faker.js**, incluyendo:

- **10 usuarios de prueba**
- **Comentarios**
- **Likes**
- **Subcomentarios**

De esta forma tendrás una base inicial de datos para trabajar en el entorno de **desarrollo**.




## Producción

#### Pre-requisitos
  - Base de Datos con las migraciones corrida
  - Configuracion de Firebase Lista
  - Configuracion de CloudDinary Lista
  - Configurara las variables de entorno

#### Opción 1: Usando Docker Compose

```bash
docker compose up -d
```

#### Opción 2: Sin Docker

1. Instalar dependencias:

```bash
npm install
```

2. Construir el proyecto:

```bash
npm run build
```

3. Iniciar el servidor en producción:

```bash
npm run start
```

## Estructura del proyecto

```
src/
 ├─ components/    # Componentes del proyecto
 ├─ common/        # Componentes y utilidades comunes
 ├─ config/        # Configuraciones
 ├─ main.ts        # Entrada principal de la aplicación
 └─ ...
```

## Notas

* Asegúrate de que la base de datos este correindo, antes de levntar el Proyecto, y de haber corrido las migraciones primero, para la creacion de las tablas.

* Asegúrate de que Firebase Auth este bien configurado, y haber habilitado el Provider de Correo y de Google como metodo de autenticacion

* Asegúrate de haber creado una cuenta en CloudDinary y de obtener las variabels de configuracion correctas.

* GraphQL Playground está habilitado para facilitar pruebas de queries y mutations.

## IMPORTANTE !!

Todos los usuarios creados, por defecto tienen el rol de USER, hay que ponerlo manual el primer user ADMIN, ya luego ese user ADMIN puede cambiar los demas usuarios.

Las migraciones hay que correrla manual, una vez que tengamos la base de Datos Levantada, debemos de ejecutar ```npm run migracion:run```, la primera vez para que la migracion tengan efecto, ya leugo podemos usarlo mediante Docker o en Node.

## Licencia
Este proyecto está bajo la [Licencia MIT](./LICENSE).