import React from "react";

export type ContextNode = {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  content: React.ReactNode;
};

export const nodesData: ContextNode[] = [
  {
    id: "security",
    title: "Seguridad & Auth",
    icon: "shield-check",
    color: "#7C3AED", // Purple
    description: "Autenticación, JWT, Encriptación y Recuperación",
    content: (
      <div className="space-y-6 text-gray-300">
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Seguridad y Autenticación</h3>
          <p>Utilizamos <strong>Supabase Auth</strong> en el Backend, que gestiona internamente la generación de tokens <strong>JWT (JSON Web Tokens)</strong> y el uso de <strong>UUIDs v4</strong> estándar a nivel empresarial para identificar de forma segura a cada usuario en la base de datos sin exponer IDs secuenciales predecibles.</p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. JSON Web Tokens (JWT)</h3>
          <p>Nuestra implementación de JWT es esencialmente <strong>a un sentido</strong> en cuanto a la emisión y consumo básico (el cliente recibe el token y lo envía en el header), pero Supabase Auth soporta refresh tokens, lo que establece un canal de validación bidireccional para mantener la sesión viva y segura.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Encriptación (Bcrypt)</h3>
          <p>No almacenamos contraseñas en texto plano. Se utiliza el algoritmo <strong>Bcrypt</strong> internamente (gestionado por Postgres/Supabase Auth) con un factor de trabajo alto para hashear las contraseñas, haciéndolas resistentes a ataques de fuerza bruta o diccionarios.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Inicio con Google (OAuth2)</h3>
          <p>Integramos proveedores de identidad externos (Google) usando el flujo OAuth2. Esto reduce la fricción en el registro y delega la responsabilidad de seguridad primaria a Google, retornando a nuestro sistema únicamente un token validado y un correo electrónico.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">5. Recuperación de Contraseña</h3>
          <p>El sistema soporta flujos de recuperación mediante enlaces mágicos (Magic Links) o códigos OTP enviados por correo, asegurando que un usuario que olvide sus credenciales pueda restaurar el acceso comprobando la propiedad de su bandeja de entrada.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">6. reCAPTCHA (v2 vs v3)</h3>
          <p>Para mitigar bots en los formularios de registro y login, es recomendable el uso de reCAPTCHA. La <strong>v2</strong> es visual (desafíos de imágenes o checkbox "I am not a robot"), mientras que la <strong>v3</strong> es invisible y asigna una puntuación de comportamiento al usuario para decidir si es humano o no, mejorando el UX.</p>
        </section>
      </div>
    )
  },
  {
    id: "frontend",
    title: "Manejo de Sesiones & UI",
    icon: "layout",
    color: "#3B82F6", // Blue
    description: "Cookies, Rutas, UX/UI, HTML5 y Componentes",
    content: (
      <div className="space-y-6 text-gray-300">
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Manejo de Cookies y el endpoint /me</h3>
          <p>Evitamos guardar tokens sensibles en <code>localStorage</code> ya que son vulnerables a ataques XSS (Cross-Site Scripting). En su lugar, usamos <strong>Cookies HttpOnly</strong>. El concepto de la ruta <code>auth/me</code> (o <code>/api/auth/me</code>) consiste en un endpoint que el frontend consulta al cargar para validar la cookie actual contra el servidor y obtener los datos del usuario activo, sincronizando la sesión en todas las pestañas de forma segura.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. Middleware de Rol y Rutas</h3>
          <p>Usamos un <strong>Edge Middleware</strong> en Next.js (archivo <code>middleware.ts</code>) que intercepta cada petición al frontend. Verifica la existencia de una sesión válida antes de renderizar vistas protegidas (ej. <code>/dashboard</code>). Además, puede validar el rol del usuario, redirigiendo a intrusos a la página de login automáticamente.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Arquitectura Frontend (React & Next.js)</h3>
          <p>El flujo del usuario (UX) está estructurado en <strong>Vistas (Pages)</strong> y <strong>Componentes reutilizables</strong>. Separamos la lógica de estado (sesiones, modales) de la interfaz de usuario (UI), utilizando layouts anidados para no recargar barras de navegación laterales al cambiar de ruta.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Nomenclatura HTML5 y Tailwind CSS</h3>
          <p>Aplicamos semántica HTML5 (<code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;aside&gt;</code>) para mejorar la accesibilidad y el SEO. En lugar de archivos CSS puros y monolíticos, usamos <strong>Tailwind CSS</strong>, un framework de utilidades que nos permite estilizar componentes directamente en el marcado, eliminando CSS muerto y manteniendo consistencia visual en todo el sistema.</p>
        </section>
      </div>
    )
  },
  {
    id: "backend",
    title: "Backend & API",
    icon: "server",
    color: "#10B981", // Green
    description: "API REST, Rate Limiting, CORS y Swagger",
    content: (
      <div className="space-y-6 text-gray-300">
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. API RESTful</h3>
          <p>Toda la interacción entre el cliente y los servicios se realiza a través de un backend estructurado (API Routes de Next.js o backend externo). La API respeta los métodos HTTP (GET, POST, PUT, DELETE) y retorna respuestas predecibles en formato JSON estructurado.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. Rate Limiting</h3>
          <p>El <strong>Rate Limit</strong> previene abusos y ataques de denegación de servicio (DDoS) limitando la cantidad de peticiones que un usuario puede hacer en un tiempo determinado. Idealmente se aplica un límite global (ej. 100 req/min) a toda la App, y límites mucho más estrictos (ej. 5 req/min) a endpoints críticos como <code>/login</code> o <code>/recover-password</code>.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. CORS (Cross-Origin Resource Sharing)</h3>
          <p>Implementamos políticas de <strong>CORS</strong> estrictas. Esto significa que la API rechaza peticiones originadas desde dominios no autorizados por nosotros, protegiendo así el backend de scripts maliciosos alojados en otras páginas web que intenten robar o alterar información del usuario activo.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Swagger (Documentación de la API)</h3>
          <p>Para exponer la API a otros desarrolladores o equipos, se utiliza documentación estandarizada como <strong>Swagger (OpenAPI)</strong>. Aunque Next.js usa rutas dinámicas, herramientas como Postman o implementaciones parciales de Swagger nos permiten documentar qué parámetros requiere cada ruta, qué roles tienen acceso y qué estructura JSON devuelven.</p>
        </section>
      </div>
    )
  },
  {
    id: "database",
    title: "Base de Datos & QA",
    icon: "database",
    color: "#F59E0B", // Yellow
    description: "Arquitectura DB, Buenas Prácticas y Testing",
    content: (
      <div className="space-y-6 text-gray-300">
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Base de Datos (Estructura y ORM)</h3>
          <p>Utilizamos una base de datos relacional (PostgreSQL en Supabase). Manejamos la comunicación mediante <strong>clientes tipados / ORMs</strong>, lo que permite mapear tablas directamente a objetos en código y prevenir inyecciones SQL. Las tablas cuentan con políticas RLS (Row Level Security) para que un usuario solo pueda leer sus propios datos desde la DB.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. Testing (Pruebas Unitarias y Mockito)</h3>
          <p>Para verificar el correcto funcionamiento de rutas, lógica de negocios y asegurar que un cambio no rompa la aplicación, se emplean <strong>pruebas unitarias</strong>. Herramientas como Jest o <strong>Mockito</strong> (comúnmente usado en backends Java/Spring) permiten "burlar" (mockear) la base de datos real, probando exclusivamente el código de un controlador sin afectar datos en producción.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Buenas Prácticas de Almacenamiento</h3>
          <p><strong>Regla de oro:</strong> Nunca almacenamos archivos binarios (imágenes, PDFs, avatares) directamente en columnas de la base de datos (como base64 pesados). Utilizamos un servicio de <strong>Object Storage</strong> (Buckets) y en la base de datos únicamente guardamos el String de la URL que apunta a ese archivo. Esto mantiene la base de datos liviana y veloz.</p>
        </section>
        
        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Buenas Prácticas de Código</h3>
          <p>Separamos estrictamente la lógica: no inyectamos scripts ni CSS en línea dentro del HTML (JSX), sino que abstraemos todo a archivos externos o utilizamos Tailwind como estándar global, garantizando que el marcado sea limpio y fácil de mantener.</p>
        </section>
      </div>
    )
  },
  {
    id: "infra",
    title: "Infraestructura & DevOps",
    icon: "cloud",
    color: "#EC4899", // Pink
    description: "Git, Docker, Vercel y CI/CD",
    content: (
      <div className="space-y-6 text-gray-300">
        <section>
          <h3 className="text-xl font-bold text-white mb-2">1. Control de Versiones (Git y GitHub)</h3>
          <p>Usamos <strong>Git</strong> para gestionar el historial del código, permitiéndonos crear ramas (branches) para nuevas características sin romper la línea principal (main). <strong>GitHub</strong> aloja nuestro código en la nube, facilitando el trabajo colaborativo, la revisión de código (Pull Requests) y manteniendo el proyecto centralizado.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">2. Docker y Contenedorización</h3>
          <p>Utilizamos <strong>Docker</strong> para encapsular nuestra aplicación junto con todas sus dependencias en una "imagen". Esto garantiza que el proyecto funcione exactamente igual en el equipo de cualquier desarrollador y en el servidor de producción. Al modificar el código, construimos una imagen de Docker actualizada que reemplaza a la anterior sin afectar el ecosistema.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">3. Despliegue en Vercel</h3>
          <p>Para los aplicativos frontend desarrollados en Next.js, plataformas como <strong>Vercel</strong> ofrecen despliegue automatizado, distribuyendo nuestra app en una red global (CDN) y gestionando la configuración de dominios, SSL y caché al instante (Serverless Edge).</p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-white mb-2">4. Integración y Despliegue Continuo (GitHub Actions)</h3>
          <p>Implementamos <strong>CI/CD</strong> (Continuous Integration/Continuous Deployment) usando GitHub Actions. Cuando subimos código a <code>main</code>, GitHub ejecuta automáticamente un script (Action) que corre nuestras pruebas (tests), verifica que el código compile, e instruye a Vercel o a nuestro servidor Docker a descargar la nueva versión y ponerla en vivo sin intervención humana.</p>
        </section>
      </div>
    )
  }
];
