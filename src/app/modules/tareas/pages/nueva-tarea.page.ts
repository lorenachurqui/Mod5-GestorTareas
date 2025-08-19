import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TareaFormComponent } from '../components/tarea-form/tarea-form.component';

@Component({
  standalone: true,
  selector: 'app-nueva-tarea',
  imports: [CommonModule, TareaFormComponent],
  template: `
    <app-tarea-form (onGuardado)="volver()"></app-tarea-form>
  `
})
export class NuevaTareaPage {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/tareas']);
  }
}