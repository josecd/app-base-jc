import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
 /*    resolve:{
      dataList:  () => inject(ModulesService).getAll().pipe(
        catchError(error => {
          console.error('Error in resolver', error);
          return of(null);
        })
      ),
    } , */
    loadComponent: () => import('./components/list-companies/list-companies.component'),
  },

];
export default routes;
