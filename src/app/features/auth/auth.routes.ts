import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },

];
export default routes;
