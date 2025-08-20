import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  docData,
  doc,
  deleteDoc,
  updateDoc, query, where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TareaAsignada } from '../models/tarea-asignar.model';
import { FIRESTORE_COLLECTIONS } from '../../../shared/constants/firestore-collections';


@Injectable({
  providedIn: 'root'
})
export class TareaAsignarService {
  private readonly collectionName = FIRESTORE_COLLECTIONS.TAREA_ASIGNADA;
  private firestore = inject(Firestore);

getAsignacionesPorTarea(tareaId: string): Observable<TareaAsignada[]> {
  const ref = collection(this.firestore, FIRESTORE_COLLECTIONS.TAREA_ASIGNADA);
  const q = query(ref, where('tareaId', '==', tareaId));
  return collectionData(q, { idField: 'id' }) as Observable<TareaAsignada[]>;
}


  // ✅ Agregar una nueva asignación
  addAsignacion(asignacion: TareaAsignada): Promise<void> {
    const asignacionesRef = collection(this.firestore, this.collectionName);

    return addDoc(asignacionesRef, asignacion)
      .then(() => {
        console.log('✅ Asignación registrada');
      })
      .catch(error => {
        console.error('❌ Error al registrar asignación:', error);
        throw error;
      });
  }

  // 📄 Obtener todas las asignaciones
  getAsignaciones(): Observable<TareaAsignada[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<TareaAsignada[]>;
  }

  
  // 🔍 Obtener asignación por ID
  getAsignacionById(id: string): Observable<TareaAsignada> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<TareaAsignada>;
  }

  // 📝 Actualizar asignación
  updateAsignacion(id: string, datos: Partial<TareaAsignada>): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(docRef, datos);
  }

  // 🗑️ Eliminar asignación
  deleteAsignacion(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(docRef);
  }
}