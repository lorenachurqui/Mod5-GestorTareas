import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';
import { CategoriaFormComponent } from '../components/categoria-form/categoria-form.component';

@Component({
  standalone: true,
  selector: 'app-editar-categoria',
  imports: [CommonModule, NgIf, AsyncPipe, CategoriaFormComponent],
  template: `
    <ng-container *ngIf="categoria$ | async as categoria">
      <app-categoria-form [categoriaInicial]="categoria" (onGuardado)="volver()"></app-categoria-form>
    </ng-container>
  `
})
export class EditarCategoriaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriaService = inject(CategoriaService);

  categoria$!: Observable<Categoria>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoria$ = this.categoriaService.getCategoriaById(id);
    }
  }

  volver(): void {
    this.router.navigate(['/categorias/listar']);
  }
  
}