import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-test',
  standalone: true,
  template: `<button (click)="guardar()">Guardar</button>`,
})
export class TestComponent {
  constructor(private firestore: Firestore) {}

  guardar() {
    const ref = collection(this.firestore, 'test-conexion');
    addDoc(ref, { mensaje: 'Prueba desde test.component.ts' })
      .then(() => alert('Documento guardado'))
      .catch(err => console.error('Error al guardar:', err));
  }
}
