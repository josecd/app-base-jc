import { inject, Injectable } from '@angular/core';
import { HttpClientUserService } from '../../../../shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly _http = inject(HttpClientUserService);
  constructor() { }

  public getAll(limit: number, offset: number){
    return this._http.searchTable(`/roles/all`,limit ,offset);
  }

  public new(data: any) {
    return this._http.post(`/roles/create`, data);
  }

  public getAllModules(){
    return this._http.get(`/modules/all-modules`);
  }

}
