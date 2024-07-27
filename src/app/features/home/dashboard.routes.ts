import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dahboard/dahboard.component'),
  },

];
export default routes;
