# 🛒 Ecommerce Web Avanzado

Este es el repositorio para un proyecto de E-commerce avanzado. Incluye un backend completo, una base de datos y todo lo necesario para un entorno de desarrollo local robusto.

---

## 🚀 Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### ✅ Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

-   [**Node.js**](https://nodejs.org/en/) (versión 16 o superior)
-   [**Yarn**](https://yarnpkg.com/) (gestor de paquetes)
-   [**Docker**](https://www.docker.com/products/docker-desktop/) (para la gestión de la base de datos)

---

### 🛠️ Guía de Instalación

1.  **Clona el Repositorio**
    Abre tu terminal y clona este repositorio en tu máquina local.

    ```bash
    git clone [https://github.com/JosueRDx/Ecommerce_Web_Avanzado](https://github.com/JosueRDx/Ecommerce_Web_Avanzado)
    cd Ecommerce_Web_Avanzado
    ```

2.  **Instala las Dependencias**
    Usa Yarn para instalar todas las dependencias del proyecto definidas en el `package.json`.

    ```bash
    yarn install
    ```

3.  **Configura las Variables de Entorno**
    Copia el archivo de ejemplo `.env.template` para crear tu propio archivo de configuración `.env`.

    ```bash
    cp .env.template .env
    ```
    > **Nota:** Abre el archivo `.env` y asegúrate de que las variables (como credenciales de la base de datos, secrets, etc.) estén configuradas correctamente para tu entorno.

4.  **Levanta la Base de Datos**
    Utiliza Docker Compose para iniciar el contenedor de la base de datos en segundo plano (`-d`). Esto creará un entorno aislado para tu base de datos sin necesidad de instalarla directamente en tu sistema.

    ```bash
    docker-compose up -d
    ```

5.  **Inicia el Servidor de Desarrollo**
    Ejecuta el siguiente comando para iniciar el servidor de desarrollo. La aplicación estará disponible en `http://localhost:3000`.

    ```bash
    npm run dev
    ```

6.  **Puebla la Base de Datos (Seed)**
    Con el servidor ya en funcionamiento, necesitarás cargar los datos iniciales de prueba. Para ello, simplemente visita la siguiente URL en tu navegador o cliente API:

    ```
    http://localhost:3000/api/seed
    ```
    Esto ejecutará un script que poblará la base de datos con productos, usuarios y otros datos de ejemplo necesarios para el desarrollo y las pruebas.

¡Y listo! 🎉 Ya puedes abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

---