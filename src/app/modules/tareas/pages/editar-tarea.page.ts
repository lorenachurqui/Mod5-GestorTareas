import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../services/tarea.service';
import { Tarea } from '../models/tarea.model';
import { Observable } from 'rxjs';
import { TareaFormComponent } from '../components/tarea-form/tarea-form.component';

@Component({
  standalone: true,
  selector: 'app-editar-tarea',
  imports: [CommonModule, NgIf, AsyncPipe, TareaFormComponent],
  template: `
    <ng-container *ngIf="tarea$ | async as tarea">
      <app-tarea-form [tareaInicial]="tarea" (onGuardado)="volver()"></app-tarea-form>
    </ng-container>
  `
})
export class EditarTareaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tareaService = inject(TareaService);

  tarea$!: Observable<Tarea>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarea$ = this.tareaService.getTareaById(id);
    }
  }

  volver(): void {
    this.router.navigate(['/tareas/listar']);
  }
  
}