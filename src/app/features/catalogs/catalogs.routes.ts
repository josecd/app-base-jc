import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista',
    loadComponent: () => import('./components/list-catags/list-catags.component'),
  },
  {
    path: 'tipos',
    loadComponent: () => import('./components/list-type-catalgs/list-type-catalgs.component'),
  },
];
export default routes;
