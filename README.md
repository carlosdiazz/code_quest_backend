# CODE QUEST 2025 - Backend

Nosotros somos **DevCaribe**, este es el **backend** del proyecto **Blog Comunitario** para el desafío **CODE QUEST 2025** organizado por **Fernando Herrera**.

La aplicación está desarrollada con **NestJS**, utiliza **PostgreSQL** como base de datos, **TypeORM** como ORM, **GraphQL** para la comunicación y **Fastify** para mejorar el rendimiento. La autenticación y autorización se manejan mediante **Firebase**. Para la comunicacion continua implementamos WebSocket usando ***Socket.io***

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

# Code Quest Backend - Guía de Configuración

## 1. Base de Datos

Subir una base de Dato Postgres, ya sea local o en la nube

## 2. Firebase

1. Crear un proyecto en Google Cloud.
2. Habilitar Firebase Auth y configurar la autenticación.
3. Como metodos de autenticacion usamos el del Correo y el de Google


## 3. Instalación de dependencias

```bash
npm install
```

## 4. Variables de entorno

Clonar el archivo `template.env` como `.env`:

```bash
cp template.env .env
```

Configurar las variables según la base de datos que se use y otras configuraciones (puerto, etc.).

## Desarrollo

Ejecutar la primera migración para crear las tablas en la base de datos:

```bash
npm run migration:run
```

Levantar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:{PUERTO}/graphql` para interactuar con GraphQL Playground.

## Producción

### Opción 1: Usando Docker Compose

Se incluye un ejemplo de un Docker-Compose

```bash
docker compose up -d
```

### Opción 2: Sin Docker

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno (.env).
3. Ejecutar migraciones:

```bash
npm run migration:run
```

4. Construir el proyecto:

```bash
npm run build
```

5. Iniciar el servidor en producción:

```bash
npm run start
```

## Estructura del proyecto

```
src/
 ├─ modules/       # Módulos del proyecto
 ├─ common/        # Componentes y utilidades comunes
 ├─ config/        # Configuraciones
 ├─ main.ts        # Entrada principal de la aplicación
 └─ ...
```

## Notas

* Asegúrate de que la base de datos y Firebase estén correctamente configurados antes de ejecutar el proyecto.
* GraphQL Playground está habilitado para facilitar pruebas de queries y mutations.
