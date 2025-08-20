/**
 * Archivo: src/app/core/firebase/firebase.config.ts
 * Rol: Centraliza la configuración de Firebase para inicializar la app y servicios cloud.
 * Justificación: Evita duplicidad de claves en otros archivos, mejora trazabilidad.
 */

export const firebaseConfig = {
  apiKey: 'AIzaSyAArD8AmB0DLRGcI-v5AF2YM7RSXlRok70', // Clave pública para autenticar la app con Firebase
  authDomain: 'gestortareas-12345.firebaseapp.com', // Dominio que permite login y redirecciones
  projectId: 'gestortareas-12345', // Identificador único del proyecto Firebase
  storageBucket: 'gestortareas-12345.firebasestorage.app', // Para subir o leer archivos si usás Firebase Storage
  messagingSenderId: '1048851892026', // Identificador de servicio de notificaciones (si aplica)
  appId: '1:1048851892026:web:4661f42b3305882d723203',  // Identificador de la app registrado en Firebase
  measurementId: "G-YV4EY2TTKE"
};