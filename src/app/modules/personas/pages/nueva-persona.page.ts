import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonaFormComponent } from '../components/persona-form/persona-form.component';

@Component({
  standalone: true,
  selector: 'app-nueva-persona',
  imports: [CommonModule, PersonaFormComponent],
  template: `
    <app-persona-form (onGuardado)="volver()"></app-persona-form>
  `
})
export class NuevaPersonaPage {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/personas']);
  }
}