# Biblioteca Frontend

Portal web desarrollado en React para la gestión de libros y autores.

Este proyecto forma parte de una prueba técnica. Se conecta con un backend en Spring Boot protegido con JWT.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- Fetch API
- LocalStorage
- JWT

## Funcionalidades implementadas

### Login

- Pantalla de inicio de sesión.
- Login real contra backend.
- Almacenamiento de JWT en `localStorage`.
- Manejo de sesión con duración de 1 hora.
- Cierre de sesión.

### Autores

- Listar autores.
- Crear autor.
- Editar autor.
- Eliminar autor.
- Al eliminar un autor, también se eliminan sus libros asociados desde backend.

### Libros

- Listar libros.
- Crear libro.
- Editar libro.
- Eliminar libro.
- Asociación de libro con autor.
- Visualización de portada si existe URL.

### Diseño

- Interfaz tipo dashboard.
- Componentes separados.
- Diseño responsive.
- Vista de tarjetas para libros.
- Tabla para autores.
- Navegación lateral.
- Estados vacíos.

## Estructura principal

```text
src/
 ├─ components/
 │  ├─ Login.jsx
 │  ├─ Autores.jsx
 │  └─ Libros.jsx
 ├─ services/
 │  └─ api.js
 ├─ App.jsx
 ├─ App.css
 └─ index.css
```

## Requisitos previos

- Node.js
- npm
- Backend corriendo en `http://localhost:8080`

## Cómo ejecutar el proyecto

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
cd biblioteca-frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

## Configuración de proxy

El proyecto usa proxy de Vite para comunicarse con el backend.

Archivo:

```text
vite.config.js
```

Configuración:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

Esto permite consumir endpoints usando rutas como:

```text
/api/login
/api/autores
/api/libros
```

## Usuario de prueba

```text
Usuario: admin
Contraseña: 123456
```

## Flujo de uso

1. Iniciar el backend.
2. Iniciar el frontend.
3. Entrar con el usuario de prueba.
4. Crear autores.
5. Crear libros asociados a autores.
6. Editar o eliminar registros desde la interfaz.

## Seguridad

Después del login, el frontend guarda el token JWT en `localStorage`.

Todas las peticiones protegidas envían el token en el header:

```http
Authorization: Bearer TOKEN
```

## Alcance actual

Implementado:

- Login conectado con backend.
- Manejo de sesión por 1 hora.
- CRUD completo de autores.
- CRUD completo de libros.
- Búsqueda visual de libros por título o autor.
- Paginación visual de autores.
- Paginación visual de libros.
- Manejo visual de errores.
- Consumo de API protegida con JWT.
- Diseño responsive.
- Componentes separados.

Pendiente por límite de tiempo:

- Carga masiva de libros por CSV.
- Validación de ISBN mediante SOAP.
- Obtención automática de portada desde API REST externa.


## Notas

Por el límite de tiempo de la prueba, se priorizó una versión funcional y presentable conectada al backend real. La interfaz permite probar el flujo principal de gestión de libros y autores.
