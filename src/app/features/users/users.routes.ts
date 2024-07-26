import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-users/home-users.component'),
  },

];
export default routes;
