import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  collectionData,
  addDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { FIRESTORE_COLLECTIONS } from '../../../shared/constants/firestore-collections';
import { EstadoPersona, ESTADOS_PERSONA } from '../../../shared/constants/estado-persona';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private readonly collectionName = FIRESTORE_COLLECTIONS.PERSONAS;
  private firestore = inject(Firestore);
  //private coleccion = collection(this.firestore, this.collectionName);

  getPersonaById(id: string): Observable<Persona> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Persona>;
  }

  getPersonas(): Observable<Persona[]> {
    const personasRef = collection(this.firestore, this.collectionName);
    return collectionData(personasRef, { idField: 'id' }) as Observable<Persona[]>;
  }

 addPersona(persona: Persona): Promise<void> {
  const personaConTimestamp = {
    ...persona,
    fechaCreacion: serverTimestamp()
  };

  const personasRef = collection(this.firestore, this.collectionName);

  return addDoc(personasRef, personaConTimestamp)
    .then(() => {
      console.log('✅ Documento persona creado con timestamp');
    })
    .catch(error => {
      console.error('❌ Error al crear documento persona:', error);
      throw error;
    });
}

  updatePersona(id: string, persona: Partial<Persona>): Promise<void> {
    const personaDoc = doc(this.firestore, `${FIRESTORE_COLLECTIONS.PERSONAS}/${id}`);
    return updateDoc(personaDoc, persona);
  }

  deletePersona(id: string): Promise<void> {
    const personaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(personaDoc);
  }

}