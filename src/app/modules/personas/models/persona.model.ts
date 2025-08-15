import { EstadoPersona } from '../../../shared/constants/estado-persona';
import { FieldValue } from '@angular/fire/firestore'; // para serverTimestamp

export interface Persona {
  id?: string;                     // ID del documento en Firestore
  nombre: string;                 // Nombre propio
  apellidoPaterno: string;       // Apellido paterno
  apellidoMaterno: string;       // Apellido materno
  correo: string;                // Correo electrónico
  telefono: string;              // Número de contacto
  fotoUrl?: string;              // URL de la foto, opcional si no está subida
  estado: EstadoPersona;         // Estado actual de la persona
  fechaCreacion?: FieldValue;    // Timestamp generado por el servidor
}