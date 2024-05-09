import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },

  {
    path: 'loggin',
    loadComponent: () =>
      import('./features/loggin/loggin.page').then((m) => m.LogginPage),
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./features/inicio/inicio.page').then((m) => m.InicioPage),
  },

  {
    path: 'lobby',
    loadComponent: () =>
      import('./features/lobby/lobby.page').then((m) => m.LobbyPage),
  },
  {
    path: 'registrar',
    loadComponent: () =>
      import('./features/registrar/registrar.page').then(
        (m) => m.RegistrarPage
      ),
  },
];
