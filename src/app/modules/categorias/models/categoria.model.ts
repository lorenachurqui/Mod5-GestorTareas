import { EstadoRegistro } from '../../../shared/constants/estado-registro';
import { FieldValue } from '@angular/fire/firestore'; // para serverTimestamp

export interface Categoria {
  id?: string;             
  nombre: string;                
  abreviatura: string;       
  descripcion: string;
  estado: EstadoRegistro;         
  fechaCreacion?: FieldValue;    // Timestamp generado por el servidor
}