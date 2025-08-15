import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
      path: 'personas/crear',
      loadComponent: () =>
        import('./modules/personas/pages/nueva-persona.page')
          .then(m => m.NuevaPersonaPage),
          title: 'Crear Persona'
      },
      {
        path: 'personas/listar',
        loadComponent: () =>
          import('./modules/personas/components/persona-list/persona-list.component')
            .then(m => m.PersonaListComponent),
            title: 'Lista de Personas'
      },
      {
        path: 'personas/editar/:id',
        loadComponent: () =>
          import('./modules/personas/pages/editar-persona.page')
        .then(m => m.EditarPersonaPage),
        title: 'Editar Persona'
      }
      // tareas, categorías, usuarios...
      , {
        path: 'test',
        loadComponent: () =>
          import('./test/test.component').then(m => m.TestComponent)
      }


    ]
  }
];
