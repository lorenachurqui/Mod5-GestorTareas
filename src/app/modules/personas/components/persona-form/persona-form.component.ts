import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ESTADOS_PERSONA, EstadoPersona } from '../../../../shared/constants/estado-persona';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';
import { serverTimestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.scss']
})
export class PersonaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private personaService = inject(PersonaService);
  private router = inject(Router);

  @Input() personaInicial?: Persona;
  @Output() onGuardado = new EventEmitter<void>();

  estadosDisponibles: EstadoPersona[] = ESTADOS_PERSONA;
  mostrarFallback = false;

  personaForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    fotoUrl: [''],
    estado: [ESTADOS_PERSONA[0], Validators.required]
  });

  /*
ngOnInit(): void {
  setTimeout(() => {
    if (this.personaInicial) {
      this.personaForm.patchValue(this.personaInicial);
    }
  });
}*/
ngOnInit(): void {
  if (this.personaInicial) {
    this.personaForm.patchValue(this.personaInicial);
  }
}

guardar(): void {
    if (!this.personaForm.valid) {
      console.warn('⚠️ El formulario no es válido');
      return;
    }

    const datos = this.personaForm.value;
    

    if (this.personaInicial?.id) {
      this.personaService.updatePersona(this.personaInicial.id, datos)
        .then(() => {
          console.log('✅ Persona actualizada');
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al actualizar persona:', error);
        });
    } else {
      const nuevaPersona: Persona = {
        ...datos,
        fechaCreacion: serverTimestamp()
      };

      this.personaService.addPersona(nuevaPersona)
        .then(() => {
          console.log('✅ Persona creada');
          this.personaForm.reset();
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al guardar persona:', error);
        });
    }
  }





}
