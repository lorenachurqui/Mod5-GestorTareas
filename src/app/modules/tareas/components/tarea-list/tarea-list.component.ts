import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable, combineLatest, map } from 'rxjs';
import { TareaService } from '../../services/tarea.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Tarea } from '../../models/tarea.model'; 
import { Categoria } from '../../../categorias/models/categoria.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarea-list',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.scss']
})
export class TareaListComponent implements OnInit {
  tarea$!: Observable<Tarea[]>;
  
  constructor(
    private tareaService: TareaService,
    private categoriaService: CategoriaService
  ) {}


  ngOnInit(): void {
    this.tarea$ = combineLatest([
      this.tareaService.getTareas(),
      this.categoriaService.getCategorias()
    ]).pipe(
      map(([tareas, categorias]) => {
        return tareas.map(t => ({
          ...t,
          categoriaNombre: categorias.find(c => c.id === t.categoriaId)?.nombre || 'Sin categoría'
        }));
      })
    );
  }

  eliminar(id: string | undefined): void {
    if (!id) return;
    this.tareaService.deleteTarea(id);  
  }

}