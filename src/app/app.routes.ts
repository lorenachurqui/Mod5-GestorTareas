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
      ,{
      path: 'categorias/crear',
      loadComponent: () =>
        import('./modules/categorias/pages/nueva-categoria.page')
          .then(m => m.NuevaCategoriaPage),
          title: 'Crear Categoria'
      },
      {
        path: 'categorias/listar',
        loadComponent: () =>
          import('./modules/categorias/components/categoria-list/categoria-list.component')
            .then(m => m.CategoriaListComponent),
            title: 'Lista de Categorias'
      },
      {
        path: 'categorias/editar/:id',
        loadComponent: () =>
          import('./modules/categorias/pages/editar-categoria.page')
        .then(m => m.EditarCategoriaPage),
        title: 'Editar Categoria'
      }
        // tareas, categorías, usuarios...
      ,{
      path: 'tareas/crear',
      loadComponent: () =>
        import('./modules/tareas/pages/nueva-tarea.page')
          .then(m => m.NuevaTareaPage),
          title: 'Crear Tarea'
      },
      {
        path: 'tareas/listar',
        loadComponent: () =>
          import('./modules/tareas/components/tarea-list/tarea-list.component')
            .then(m => m.TareaListComponent),
            title: 'Lista de Tareas'
      },
      {
        path: 'tareas/editar/:id',
        loadComponent: () =>
          import('./modules/tareas/pages/editar-tarea.page')
        .then(m => m.EditarTareaPage),
        title: 'Editar Tarea'
      },
      {
        path: 'tareas/asignar/:id',
        loadComponent: () => 
          import('./modules/tareas/components/tarea-asignar/tarea-asignar.component')
        .then(m => m.TareaAsignarComponent),
        title: 'Asignar Tarea'
      },

      {
        path: 'tareas/calendario',
        loadComponent: () =>
          import('./modules/tareas/components/tarea-calendario/tarea-calendario.component')
            .then(m => m.TareaCalendarioComponent),
            title: 'Tareas por fecha'
      }   
      , {
        path: 'test',
        loadComponent: () =>
          import('./test/test.component').then(m => m.TestComponent)
      }


    ]
  }
];
