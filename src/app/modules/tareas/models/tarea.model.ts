import { EstadoTarea } from '../../../shared/constants/estado-tarea';
import { PrioridadTarea } from '../../../shared/constants/prioridad-tarea';
import { FieldValue } from '@angular/fire/firestore'; // para serverTimestamp

export interface Tarea {
  id?: string;             
  titulo: string;
  descripcion: string;                  
  fechaEntrega: string;        
  categoriaId: string;
  categoriaNombre?: string;
  estado: EstadoTarea;
  prioridad: PrioridadTarea;          
  fechaCreacion?: FieldValue;    // Timestamp generado por el servidor
}