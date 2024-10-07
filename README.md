
# Desafío-6

## Desafío - Soft Jobs Backend

### Descripción del Proyecto
Este proyecto es el backend desarrollado como parte del Desafío Soft Jobs. El objetivo principal es proporcionar una API que gestione el registro, autenticación (mediante JWT), y acceso a rutas protegidas de usuarios. Este backend se conecta a una base de datos **PostgreSQL** y es consumido por un frontend desarrollado con **Vite** y **React**.

### Autor:
**Christopher Thompson**

---

## Tecnologías Utilizadas

- **Node.js**: Framework de JavaScript del lado del servidor.
- **Express.js**: Framework minimalista para construir APIs y servidores web.
- **PostgreSQL**: Base de datos relacional usada para almacenar los usuarios.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización de los usuarios.
- **bcrypt.js**: Para la encriptación de contraseñas.
- **CORS**: Middleware para permitir solicitudes entre el frontend (Vite) y el backend.
- **Vite** y **React**: Para el frontend del proyecto (integrado en un proyecto separado).

---

## Requisitos Previos

### Instalación de Dependencias

Antes de ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

1. **Node.js** (versión 14 o superior): [Instalar Node.js](https://nodejs.org/)
2. **PostgreSQL**: Base de datos relacional. Puedes instalarla desde: [Instalar PostgreSQL](https://www.postgresql.org/download/)

### Configuración de PostgreSQL

- Asegúrate de tener una base de datos PostgreSQL corriendo y crea una base de datos llamada `softjobs`.
- Configura los accesos en el archivo `index.js` con tu **usuario**, **contraseña** y **nombre de base de datos**:

```javascript
const pool = new Pool({
    user: 'postgres',          // Cambiar por tu usuario de PostgreSQL
    host: 'localhost',
    database: 'softjobs',      // Cambiar si tu base de datos tiene otro nombre
    password: 'CAMBIAR_AQUI_LA_CONTRASENA',  // Cambiar por tu contraseña de PostgreSQL
    port: 5432,
});
```

---

## Instalación y Ejecución del Proyecto

Sigue estos pasos para instalar y ejecutar el backend del proyecto:

1. **Clonar el repositorio**

```bash
git clone <url_del_repositorio>
```

2. **Instalar las dependencias**

```bash
npm install
```

3. **Iniciar el servidor**

```bash
node index.js
```

4. **Acceder a la API**

- El servidor estará corriendo en `http://localhost:3000`.

---

## Rutas Implementadas

### 1. Registro de Usuario (POST /usuarios)

Esta ruta permite registrar un nuevo usuario en el sistema. Todos los campos son obligatorios.

- **Método**: POST
- **URL**: `/usuarios`
- **Cuerpo de la Solicitud (JSON)**:

```json
{
  "email": "nuevo@correo.com",
  "password": "123456",
  "rol": "usuario",
  "lenguage": "javascript"
}
```

- **Respuesta**: Devuelve los datos del usuario registrado.

### 2. Login de Usuario (POST /login)

Esta ruta permite iniciar sesión con un usuario existente y recibir un token JWT.

- **Método**: POST
- **URL**: `/login`
- **Cuerpo de la Solicitud (JSON)**:

```json
{
  "email": "nuevo@correo.com",
  "password": "123456"
}
```

- **Respuesta**: Devuelve un token JWT válido por 1 hora.

### 3. Ruta Protegida (GET /usuarios)

Esta es una ruta protegida que solo puede ser accedida con un token JWT válido.

- **Método**: GET
- **URL**: `/usuarios`
- **Encabezado de la Solicitud**:

```bash
Authorization: Bearer <token_JWT>
```

- **Respuesta**: Devuelve los datos del usuario autenticado.

---

## Personalización

### Llave Secreta para JWT

Asegúrate de cambiar la **llave secreta** usada para firmar y verificar los tokens JWT por una clave más segura. Esta se encuentra en el archivo `index.js`:

```javascript
const secretKey = 'CAMBIAR_AQUI_LA_LLAVE_SECRETA';  // Cambiar por una clave secreta segura
```

---

## Despliegue del Frontend

El frontend fue desarrollado usando **Vite** y **React**. Sigue los siguientes pasos para ejecutar el frontend:

1. Navegar a la carpeta del frontend.
2. Ejecutar `npm install` para instalar las dependencias.
3. Iniciar el servidor de desarrollo con `npm run dev`.
4. Asegurarse de que el frontend apunte a la URL correcta del backend (`http://localhost:3000`).

---

## Descripción Técnica

Este proyecto implementa una arquitectura de **API REST** en Node.js con autenticación basada en tokens JWT. Las contraseñas de los usuarios son encriptadas con **bcrypt** antes de almacenarse en la base de datos.

El backend y frontend están separados, por lo que se utiliza **CORS** para permitir la comunicación entre ambos, facilitando las solicitudes desde el frontend hacia el backend.

---

## Autor

**Christopher Thompson**

Este proyecto fue desarrollado como parte del **Desafío Soft Jobs**.
