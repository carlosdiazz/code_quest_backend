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
- **Socker.io** WebSocket

---

## Requisitos

- Node.js v20+
- npm v9+
- PostgreSQL (local o en la nube)
- Docker (opcional, para levantar la base de datos local)
- Proyecto de Firebase configurado con archivo `firebase.json`

---

## Code Quest Backend - Guía de Configuración

### Desarrollo

#### 1. Base de Datos

Subir una base de Dato Postgres, ya sea local o en la nube

#### 2. Firebase

1. Crear un proyecto en Google Cloud.
2. Habilitar Firebase Auth y configurar la autenticación.
3. Como metodos de autenticacion usamos el del Correo y el de Google


#### 3. Instalación de dependencias

```bash
npm install
```

#### 4. Variables de entorno

Clonar el archivo `template.env` como `.env`:

```bash
cp template.env .env
```

Configurar las variables según la base de datos que se use y otras configuraciones (puerto, etc.).

#### 5. Correr la Primera Migracion en al base de Datos

Ejecutar la primera migración para crear las tablas en la base de datos:

```bash
npm run migration:run
```
#### 6. Correrlo en modo desarrollo

Levantar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:{PUERTO}/graphql` para interactuar con GraphQL Playground.

## Producción

#### Pre-requisitos
  - Base de Datos con las migraciones corrida
  - Configuracion de Firebase Lista
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

* GraphQL Playground está habilitado para facilitar pruebas de queries y mutations.

## IMPORTANTE !!

Todos los usuarios creados, por defecto tienen el rol de USER, hay que ponerlo manual el primer user ADMIN, ya luego ese user ADMIn puede cambiar los demas
