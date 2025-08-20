import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../services/tarea.service';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Tarea } from '../../models/tarea.model';
import { Categoria } from '../../../categorias/models/categoria.model';
import { Observable, combineLatest, map } from 'rxjs';
import { AsyncPipe, NgFor, NgIf, KeyValuePipe } from '@angular/common'
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-tarea-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, NgFor, NgIf, KeyValuePipe],
  templateUrl: './tarea-calendario.component.html',
  styleUrls: ['./tarea-calendario.component.scss']
})
export class TareaCalendarioComponent implements OnInit {
  private tareaService = inject(TareaService);
  private categoriaService = inject(CategoriaService);
 @ViewChild('contenidoExportable', { static: false }) contenido!: ElementRef;


  tareasPorFecha$!: Observable<Record<string, Tarea[]>>;

  fechaInicio: string = new Date().toISOString().slice(0, 10);
  fechaFin?: string;
  errorRangoFechas: string = '';
  
  ngOnInit(): void {
    this.actualizarTareas();
  }

  actualizarTareas(): void {
    this.errorRangoFechas = '';

    if (this.fechaFin && this.fechaFin < this.fechaInicio) {
      this.errorRangoFechas = 'La fecha fin no puede ser anterior a la fecha inicio.';
      this.tareasPorFecha$ = undefined!;
      return;
    }

    this.tareasPorFecha$ = combineLatest([
      this.tareaService.getTareas(),
      this.categoriaService.getCategorias()
    ]).pipe(
      map(([tareas, categorias]) => {
        const tareasConCategoria = tareas.map(t => ({
          ...t,
          categoriaNombre: categorias.find(c => c.id === t.categoriaId)?.nombre || 'Sin categoría'
        }));

        const tareasFiltradas = tareasConCategoria.filter(t => {
          const fecha = t.fechaEntrega;
          return fecha >= this.fechaInicio && (!this.fechaFin || fecha <= this.fechaFin);
        });

        const agrupadas: Record<string, Tarea[]> = {};
        tareasFiltradas.forEach(t => {
          const fecha = t.fechaEntrega;
          if (!agrupadas[fecha]) agrupadas[fecha] = [];
          agrupadas[fecha].push(t);
        });

        return agrupadas;
      })
    );
  }

  exportarPDF(): void {
  const elemento = this.contenido.nativeElement;

  html2canvas(elemento, {
    scale: 3,
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // Margen en milímetros

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const posX = margin;
    const posY = margin;

    pdf.addImage(imgData, 'PNG', posX, posY, imgWidth, imgHeight);
    pdf.save('calendario-tareas.pdf');
  });
}

}
