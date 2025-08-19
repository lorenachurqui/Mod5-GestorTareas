import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  updateDoc,
  deleteDoc,
  collection,
  collectionData,
  addDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';
import { FIRESTORE_COLLECTIONS } from '../../../shared/constants/firestore-collections';
import { query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private readonly collectionName = FIRESTORE_COLLECTIONS.TAREAS;
  private firestore = inject(Firestore);

  getTareaById(id: string): Observable<Tarea> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Tarea>;
  }

  getTareas(): Observable<Tarea[]> {
    const tareasRef = collection(this.firestore, this.collectionName);
    return collectionData(tareasRef, { idField: 'id' }) as Observable<Tarea[]>;
  }

  getTareasPorFecha(fecha: string): Observable<Tarea[]> {
  const tareasRef = collection(this.firestore, this.collectionName);
  const q = query(tareasRef, where('fechaEntrega', '==', fecha));
  return collectionData(q, { idField: 'id' }) as Observable<Tarea[]>;
  }

  addTarea(tarea: Tarea): Promise<void> {
    const tareaConTimestamp = {
      ...tarea,
      fechaCreacion: serverTimestamp()
    };

    const tareasRef = collection(this.firestore, this.collectionName);

    return addDoc(tareasRef, tareaConTimestamp)
      .then(() => {
        console.log('✅ Documento tarea creado con timestamp');
      })
      .catch(error => {
        console.error('❌ Error al crear documento tarea:', error);
        throw error;
      });
  }

  updateTarea(id: string, tarea: Partial<Tarea>): Promise<void> {
    const tareaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(tareaDoc, tarea);
  }

  deleteTarea(id: string): Promise<void> {
    const tareaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(tareaDoc);
  }
}