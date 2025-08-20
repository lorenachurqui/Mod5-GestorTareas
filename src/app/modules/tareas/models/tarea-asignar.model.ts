import { FieldValue } from '@angular/fire/firestore'; // para serverTimestamp

export type EstadoAsignacion = 'pendiente' | 'entregado' | 'incompleto' | 'observado';

export interface TareaAsignada {
  id?: string; // ID de la asignación (opcional, generado por Firestore)
  tareaId: string; // ID de la tarea asignada
  personaId: string; // ID de la persona que recibe la tarea
  estadoAsignacion: EstadoAsignacion; // Estado actual de la entrega
  fechaAsignacion: FieldValue; // Timestamp generado por el servidor
}