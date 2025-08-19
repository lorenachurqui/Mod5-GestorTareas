import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaFormComponent } from '../components/categoria-form/categoria-form.component';

@Component({
  standalone: true,
  selector: 'app-nueva-categoria',
  imports: [CommonModule, CategoriaFormComponent],
  template: `
    <app-categoria-form (onGuardado)="volver()"></app-categoria-form>
  `
})
export class NuevaCategoriaPage {
  private router = inject(Router);

  volver(): void {
    this.router.navigate(['/categorias']);
  }
}