import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ModulesService } from './services/modules.service';
import { catchError, of } from 'rxjs';

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
    loadComponent: () => import('./modules/modules.component'),
  },

];
export default routes;
