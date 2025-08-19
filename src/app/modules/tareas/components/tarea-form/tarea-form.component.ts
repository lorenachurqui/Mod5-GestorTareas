import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ESTADOS_TAREA, EstadoTarea } from '../../../../shared/constants/estado-tarea';
import { PRIORIDAD_TAREA, PrioridadTarea } from '../../../../shared/constants/prioridad-tarea';
import { Tarea } from '../../models/tarea.model';
import { Categoria } from '../../../categorias/models/categoria.model';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { TareaService } from '../../services/tarea.service';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss']
})
export class TareaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tareaService = inject(TareaService);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);

  @Input() tareaInicial?: Tarea;
  @Output() onGuardado = new EventEmitter<void>();

  estadosDisponibles: EstadoTarea[] = ESTADOS_TAREA;
  prioridadesDisponibles: PrioridadTarea[] = PRIORIDAD_TAREA;
  categorias: Categoria[] = [];

  tareaForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: [''],
    fechaEntrega: [''],
    categoriaId: [''],    
    estado: [ESTADOS_TAREA[0], Validators.required],
    prioridad: [PRIORIDAD_TAREA[0], Validators.required]
  });

  ngOnInit(): void {
    if (this.tareaInicial) {
      this.tareaForm.patchValue(this.tareaInicial);
    }
    this.categoriaService.getCategoriasActivas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('❌ Error al cargar categorías:', err)
    });

  }

  guardar(): void {
    if (!this.tareaForm.valid) {
      console.warn('⚠️ El formulario no es válido');
      return;
    }

    const datos = this.tareaForm.value;

    if (this.tareaInicial?.id) {
      this.tareaService.updateTarea(this.tareaInicial.id, datos)
        .then(() => {
          console.log('✅ Tarea actualizada');
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al actualizar tarea:', error);
        });
    } else {
      const nuevaTarea: Tarea = {
        ...datos,
        fechaCreacion: serverTimestamp()
      };

      this.tareaService.addTarea(nuevaTarea)
        .then(() => {
          console.log('✅ Tarea creada');
          this.tareaForm.reset();
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al guardar tarea:', error);
        });
    }
  }
}