import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-categoria-list',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {
  categoria$!: Observable<Categoria[]>;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoria$ = this.categoriaService.getCategorias();
  }

  eliminar(id: string | undefined): void {
    if (!id) return;
    this.categoriaService.deleteCategoria(id);  
  }

}