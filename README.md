# Blog API

Este repositorio contiene el backend de un sistema de blog, incluyendo módulos de **autenticación**, **publicaciones** y **comentarios**, desarrollado con **Node.js**, **Express** y **MongoDB**.

---

## 📦 Tecnologías y dependencias principales

* **Node.js** ≥ 14
* **Express**
* **MongoDB**
* **Mongoose**
* **argon2** (hash de contraseñas)
* **jsonwebtoken** (JWT)
* **express-validator** (validaciones)
* **multer** (subida de archivos)
* **dotenv** (variables de entorno)
* **helmet**, **cors**, **morgan**, **express-rate-limit**
* **swagger-jsdoc** & **swagger-ui-express** (documentación API)

---

## 🔧 Requisitos

1. Tener instalado **Node.js** y **npm** o **yarn**.
2. Tener corriendo una instancia de **MongoDB** (local o en la nube).
3. Crear un archivo `.env` en la raíz del proyecto con las variables:

   ```
   MONGO_URI=tu_uri_de_mongodb
   JWT_SECRET=clave_secreta_para_jwt
   PORT=3001
   ```

---

## 🚀 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tu_usuario/blog-api.git
cd blog-api

# Instalar dependencias
npm install
# o con yarn
yarn install

# Ejecutar en modo desarrollo
npm run dev
# Ejecutar en producción
npm start
```

Al iniciar, el servidor escuchará en `http://localhost:<PORT>` (por defecto `3001`).

---

## 🗂 Estructura del proyecto

```text
src/
├── auth/                  # Módulo de autenticación (register, login)
│   ├── auth.controller.js
│   ├── auth.routes.js
│   └── ...
├── post/                  # Módulo de publicaciones
│   ├── post.model.js
│   ├── post.controller.js
│   ├── post.routes.js
│   └── ...
├── comment/               # Módulo de comentarios
│   ├── comment.model.js
│   ├── comment.controller.js
│   ├── comment.routes.js
│   └── ...
├── middlewares/           # Validaciones, JWT, roles, carga de archivos
├── helpers/               # Generadores de JWT, validadores de DB, etc.
├── swagger.js             # Configuración de Swagger
└── server.js (o index.js) # Inicialización de la app y conexión DB
```

---

## 📚 Documentación de la API (Swagger)

Una vez que la aplicación esté corriendo, abre en el navegador:

```
http://localhost:<PORT>/api-docs
```

Ahí podrás explorar todos los endpoints, esquemas y respuestas posibles.

---

## 🔑 Endpoints principales

### Auth

| Método | Ruta                     | Descripción                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/blog/v1/auth/register` | Crear nuevo usuario        |
| POST   | `/blog/v1/auth/login`    | Login y obtención de token |

### Posts

| Método | Ruta                        | Descripción                          |
| ------ | --------------------------- | ------------------------------------ |
| GET    | `/blog/v1/posts`            | Listar todas las publicaciones       |
| GET    | `/blog/v1/posts?course=<c>` | Filtrar publicaciones por curso      |
| GET    | `/blog/v1/posts/:id`        | Obtener una publicación por ID       |
| POST   | `/blog/v1/posts`            | Crear publicación (ADMIN\_ROLE)      |
| PUT    | `/blog/v1/posts/:id`        | Actualizar publicación (ADMIN\_ROLE) |
| DELETE | `/blog/v1/posts/:id`        | Eliminar publicación (ADMIN\_ROLE)   |

### Comments

| Método | Ruta                              | Descripción                       |
| ------ | --------------------------------- | --------------------------------- |
| GET    | `/blog/v1/posts/:postId/comments` | Listar comentarios de un post     |
| POST   | `/blog/v1/posts/:postId/comments` | Crear comentario en un post       |
| DELETE | `/blog/v1/comments/:id`           | Eliminar comentario (ADMIN\_ROLE) |

---

## 🛡 Seguridad y middleware

* **JWT**: Las rutas de creación, edición y eliminación están protegidas mediante `validateJWT`.
* **Roles**: Sólo usuarios con rol `ADMIN_ROLE` pueden crear/editar/eliminar posts y comentarios.
* **Validaciones**: Se usan `express-validator` y `validarCampos` para asegurar datos de entrada.

---

## 🤝 Contribuciones

1. Realiza un *fork* del repositorio.
2. Crea una *branch* (`git checkout -b feature/mi-nueva-funcion`).
3. Haz *commit* de tus cambios (`git commit -m 'Agrega nueva función'`).
4. Sube tu rama (`git push origin feature/mi-nueva-funcion`).
5. Abre un *Pull Request*.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
