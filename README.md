# 🏋️ Front_Gestion_CAF

Aplicación web desarrollada con React para la gestión de los **Centros de Acondicionamiento Físico (CAF)**. Su objetivo es facilitar la administración de usuarios, centros deportivos, coordinadores y turnos mediante una interfaz intuitiva y organizada.

## 📋 Funcionalidades

- **Autenticación:** inicio de sesión y registro de usuarios.
- **Gestión de usuarios:** registro, consulta y actualización de información.
- **Administración de centros CAF:** gestión de centros y coordinadores.
- **Gestión de turnos:** programación, asignación y consulta de turnos.
- **Control de asistencia:** registro de asistencia y generación de reportes.
- **Formularios y documentos:** gestión de consentimientos, antecedentes médicos y documentación relacionada.
- **Navegación protegida:** control de acceso a determinadas secciones de la aplicación.

## 🛠️ Tecnologías utilizadas

- **React:** desarrollo de interfaces de usuario.
- **JavaScript:** implementación de la lógica de la aplicación.
- **React Router DOM:** navegación entre páginas.
- **React Hook Form:** gestión de formularios.
- **CSS:** estilos y diseño de la interfaz.
- **Recharts:** visualización de datos mediante gráficos.
- **React Toastify y SweetAlert2:** notificaciones y alertas.
- **npm:** gestión de dependencias.

## 📂 Estructura del proyecto

```text
front_gestion_caf/
├── public/                 # Recursos públicos
├── src/
│   ├── api/                # Comunicación con los servicios
│   ├── components/
│   │   ├── Admin/          # Componentes administrativos
│   │   ├── gestion-caf/    # Componentes compartidos
│   │   └── pages/          # Páginas y formularios
│   ├── App.jsx             # Componente principal
│   └── App.css             # Estilos generales
├── package.json            # Dependencias y scripts
└── README.md               # Documentación del proyecto
```

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

- [Node.js](https://nodejs.org/)
- npm, incluido con Node.js.
- Acceso al backend para las funcionalidades que requieren conexión con los servicios.

## 🚀 Instalación y ejecución

**1. Clonar el repositorio:**

```bash
git clone <URL_DEL_REPOSITORIO>
```

**2. Ingresar al directorio del frontend:**

```bash
cd Front_Gestion_CAF/front_gestion_caf
```

**3. Instalar las dependencias:**

```bash
npm install
```

**4. Iniciar la aplicación:**

```bash
npm start
```

La aplicación estará disponible, por defecto, en:

`http://localhost:3000`

## 🔌 Configuración del backend

Para utilizar las funcionalidades que dependen de servicios externos, es necesario configurar la URL del backend en los archivos correspondientes de la carpeta `src/api/`.

Verifica que el backend esté activo y que las rutas de los servicios estén correctamente configuradas.

## 📦 Compilación para producción

Para generar una versión optimizada de la aplicación, ejecuta:

```bash
npm run build
```

Los archivos generados se almacenarán en la carpeta `build/`, listos para desplegarse en un servidor compatible.

## 📄 Licencia

La licencia del proyecto debe definirse según las condiciones de uso y distribución establecidas por sus responsables.
