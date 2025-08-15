import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-persona-list',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent implements OnInit {
  personas$!: Observable<Persona[]>;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.personas$ = this.personaService.getPersonas();
  }

  eliminar(id: string | undefined): void {
    if (!id) return;
    this.personaService.deletePersona(id);  
  }

}