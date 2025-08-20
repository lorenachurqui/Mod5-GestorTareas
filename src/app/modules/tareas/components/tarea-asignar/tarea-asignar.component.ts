import { Component, OnInit, inject } from '@angular/core'; //
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../services/tarea.service'; 
import { TareaAsignarService } from '../../services/tarea-asignar.service';
import { PersonaService } from '../../../personas/services/persona.service';
import { Tarea } from '../../models/tarea.model'; //
import { Observable, map , combineLatest , firstValueFrom} from 'rxjs';
import { TareaAsignada, EstadoAsignacion } from '../../models/tarea-asignar.model';
import { FormsModule } from '@angular/forms'; //
import { Persona } from '../../../personas/models/persona.model';
import { serverTimestamp } from '@angular/fire/firestore';



@Component({
  selector: 'app-tarea-asignar',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './tarea-asignar.component.html',
  styleUrls: ['./tarea-asignar.component.scss']
})
export class TareaAsignarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tareaService = inject(TareaService);
  private personaService = inject(PersonaService);
private tareaAsignarService = inject(TareaAsignarService);

  tarea!: Tarea;
 // personas$!: Observable<(Persona & { asignado: boolean })[]>;
   personasAsignables: (Persona & { asignado: boolean })[] = []; 

  asignacionExitosa: boolean = false;


async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.warn('⚠️ No se recibió el ID de la tarea en la ruta');
      return;
    }

    this.tarea = await firstValueFrom(this.tareaService.getTareaById(id));
    const personas = await firstValueFrom(this.personaService.getPersonas());
    const asignaciones = await firstValueFrom(this.tareaAsignarService.getAsignacionesPorTarea(id));

    const asignadosIds = asignaciones.map(a => a.personaId).filter(Boolean);

    this.personasAsignables = personas.map(p => ({
      ...p,
      asignado: p.id ? asignadosIds.includes(p.id) : false
    }));
  }






/*
guardarAsignaciones(personas: (Persona & { asignado: boolean })[]): void {
  const tareaId = this.route.snapshot.paramMap.get('id');
  if (!tareaId) return;

  this.tareaAsignarService.getAsignacionesPorTarea(tareaId).subscribe(asignacionesPrevias => {
    const asignacionesMap = new Map(asignacionesPrevias.map(a => [a.personaId, a.id]));

    const acciones: Promise<void>[] = [];

    personas.forEach(p => {
      const yaAsignado = asignacionesMap.has(p.id!);
      const idAsignacion = asignacionesMap.get(p.id!);

      if (p.asignado && !yaAsignado) {
        const nueva: TareaAsignada = {
          tareaId,
          personaId: p.id!,
          estadoAsignacion: 'pendiente',
          fechaAsignacion: serverTimestamp()
        };
        acciones.push(this.tareaAsignarService.addAsignacion(nueva));
      }

      if (!p.asignado && yaAsignado && idAsignacion) {
        acciones.push(this.tareaAsignarService.deleteAsignacion(idAsignacion));
      }
    });

    Promise.all(acciones)
      .then(() => {
        console.log('✅ Asignaciones actualizadas correctamente');
        this.asignacionExitosa = true;
        setTimeout(() => this.volver(), 2000);
      })
      .catch(error => {
        console.error('❌ Error al actualizar asignaciones:', error);
      });
  });
}

*/
/*
async guardarAsignaciones(personas: (Persona & { asignado: boolean })[]): Promise<void> {
 

  const tareaId = this.route.snapshot.paramMap.get('id');
  if (!tareaId) return;

  const tarea = await firstValueFrom(this.tarea$);
  const asignacionesPrevias = await firstValueFrom(this.tareaAsignarService.getAsignacionesPorTarea(tareaId));

  const asignacionesMap = new Map(asignacionesPrevias.map(a => [a.personaId, a.id]));
  const acciones: Promise<void>[] = [];

  personas.forEach(p => {
    const yaAsignado = asignacionesMap.has(p.id!);
    const idAsignacion = asignacionesMap.get(p.id!);

    if (p.asignado && !yaAsignado) {
      const nueva: TareaAsignada = {
        tareaId,
        personaId: p.id!,
        estadoAsignacion: 'pendiente',
        fechaAsignacion: serverTimestamp()
      };
      acciones.push(this.tareaAsignarService.addAsignacion(nueva));
    }

    if (!p.asignado && yaAsignado && idAsignacion) {
      acciones.push(this.tareaAsignarService.deleteAsignacion(idAsignacion));
    }
  });

  try {
    await Promise.all(acciones);
    console.log('✅ Asignaciones actualizadas correctamente');
    this.asignacionExitosa = true;
    setTimeout(() => this.volver(), 2000);
  } catch (error) {
    console.error('❌ Error al actualizar asignaciones:', error);
  }
}

*/

  guardarAsignaciones(): void {
    const tareaId = this.tarea.id!;
    this.tareaAsignarService.getAsignacionesPorTarea(tareaId).subscribe(asignacionesPrevias => {
      const asignacionesMap = new Map(asignacionesPrevias.map(a => [a.personaId, a.id]));
      const acciones: Promise<void>[] = [];

      this.personasAsignables.forEach(p => {
        const yaAsignado = asignacionesMap.has(p.id!);
        const idAsignacion = asignacionesMap.get(p.id!);

        if (p.asignado && !yaAsignado) {
          const nueva: TareaAsignada = {
            tareaId,
            personaId: p.id!,
            estadoAsignacion: 'pendiente',
            fechaAsignacion: serverTimestamp()
          };
          acciones.push(this.tareaAsignarService.addAsignacion(nueva));
        }

        if (!p.asignado && yaAsignado && idAsignacion) {
          acciones.push(this.tareaAsignarService.deleteAsignacion(idAsignacion));
        }
      });

      Promise.all(acciones)
        .then(() => {
          console.log('✅ Asignaciones actualizadas correctamente');
          this.asignacionExitosa = true;
          setTimeout(() => this.volver(), 2000);
        })
        .catch(error => {
          console.error('❌ Error al actualizar asignaciones:', error);
        });
    });
  }




volver(): void {
    this.router.navigate(['/tareas/listar']);
  }
}
