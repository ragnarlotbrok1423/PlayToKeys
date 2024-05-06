import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then( m => m.CoreModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule)
  },
  {
    path: 'loggin',
    loadComponent: () => import('./features/loggin/loggin.page').then( m => m.LogginPage)
  },  {
    path: 'inicio',
    loadComponent: () => import('./features/inicio/inicio.page').then( m => m.InicioPage)
  },

 


];
