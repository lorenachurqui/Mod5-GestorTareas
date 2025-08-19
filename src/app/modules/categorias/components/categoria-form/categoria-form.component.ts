import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ESTADOS_REGISTRO, EstadoRegistro } from '../../../../shared/constants/estado-registro';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);

  @Input() categoriaInicial?: Categoria;
  @Output() onGuardado = new EventEmitter<void>();

  estadosDisponibles: EstadoRegistro[] = ESTADOS_REGISTRO;

  categoriaForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    abreviatura: [''],
    descripcion: [''],
    estado: [ESTADOS_REGISTRO[0], Validators.required]
  });

  ngOnInit(): void {
    if (this.categoriaInicial) {
      this.categoriaForm.patchValue(this.categoriaInicial);
    }
  }

  guardar(): void {
    if (!this.categoriaForm.valid) {
      console.warn('⚠️ El formulario no es válido');
      return;
    }

    const datos = this.categoriaForm.value;

    if (this.categoriaInicial?.id) {
      this.categoriaService.updateCategoria(this.categoriaInicial.id, datos)
        .then(() => {
          console.log('✅ Categoría actualizada');
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al actualizar categoría:', error);
        });
    } else {
      const nuevaCategoria: Categoria = {
        ...datos,
        fechaCreacion: serverTimestamp()
      };

      this.categoriaService.addCategoria(nuevaCategoria)
        .then(() => {
          console.log('✅ Categoría creada');
          this.categoriaForm.reset();
          this.onGuardado.emit();
        })
        .catch(error => {
          console.error('❌ Error al guardar categoría:', error);
        });
    }
  }
}