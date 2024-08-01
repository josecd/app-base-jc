import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/404/404/404.component';
import { FullComponent } from './layout/full/full.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate:[authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard',     loadChildren: () => import('./features/home/dashboard.routes')},
      { path: 'usuarios',     loadChildren: () => import('./features/administration/users/users.routes')},
      { path: 'modulos',     loadChildren: () => import('./features/administration/modules/module.routes')},
      { path: 'permisos',     loadChildren: () => import('./features/administration/permissions/permissions.routes')},
      { path: 'roles',     loadChildren: () => import('./features/administration/roles/roles.routes')},
      { path: 'empresas',     loadChildren: () => import('./features/administration/companies/companies.routes')},

      { path: 'catalogos',     loadChildren: () => import('./features/catalogs/catalogs.routes')},

    ]
  },
  {
    path:"",
    canActivate:[loginGuard],
    children:[
      { path: '',     loadChildren: () => import('./features/auth/auth.routes')},
    ]
  },

  { path: '**', component: NotFoundComponent }

];
