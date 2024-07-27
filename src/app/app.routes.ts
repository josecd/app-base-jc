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
      { path: 'usuarios',     loadChildren: () => import('./features/users/users.routes')},
      { path: 'modulos',     loadChildren: () => import('./features/modules/module.routes')},
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
