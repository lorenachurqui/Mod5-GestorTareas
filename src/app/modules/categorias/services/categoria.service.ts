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
import { Categoria } from '../models/categoria.model';
import { FIRESTORE_COLLECTIONS } from '../../../shared/constants/firestore-collections';
import { EstadoRegistro } from '../../../shared/constants/estado-registro';
import { query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly collectionName = FIRESTORE_COLLECTIONS.CATEGORIAS;
  private firestore = inject(Firestore);

  getCategoriaById(id: string): Observable<Categoria> {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<Categoria>;
  }

  getCategorias(): Observable<Categoria[]> {
    const categoriasRef = collection(this.firestore, this.collectionName);
    return collectionData(categoriasRef, { idField: 'id' }) as Observable<Categoria[]>;
  }

  getCategoriasActivas(): Observable<Categoria[]> {
    const categoriasRef = collection(this.firestore, this.collectionName);
    const q = query(categoriasRef, where('estado', '==', EstadoRegistro.ACTIVO));
    return collectionData(q, { idField: 'id' }) as Observable<Categoria[]>;
  }


  addCategoria(categoria: Categoria): Promise<void> {
    const categoriaConTimestamp = {
      ...categoria,
      fechaCreacion: serverTimestamp()
    };

    const categoriasRef = collection(this.firestore, this.collectionName);

    return addDoc(categoriasRef, categoriaConTimestamp)
      .then(() => {
        console.log('✅ Documento categoría creado con timestamp');
      })
      .catch(error => {
        console.error('❌ Error al crear documento categoría:', error);
        throw error;
      });
  }

  updateCategoria(id: string, categoria: Partial<Categoria>): Promise<void> {
    const categoriaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(categoriaDoc, categoria);
  }

  deleteCategoria(id: string): Promise<void> {
    const categoriaDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(categoriaDoc);
  }
}