import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona.model';
import { Observable } from 'rxjs';
import { PersonaFormComponent } from '../components/persona-form/persona-form.component';

@Component({
  standalone: true,
  selector: 'app-editar-persona',
  imports: [CommonModule, NgIf, AsyncPipe, PersonaFormComponent],
  template: `
    <ng-container *ngIf="persona$ | async as persona">
      <app-persona-form [personaInicial]="persona" (onGuardado)="volver()"></app-persona-form>
    </ng-container>
  `
})
export class EditarPersonaPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personaService = inject(PersonaService);

  persona$!: Observable<Persona>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.persona$ = this.personaService.getPersonaById(id);
    }
  }

  volver(): void {
    this.router.navigate(['/personas/listar']);
  }
  
}