import { inject, Injectable } from '@angular/core';
import { HttpClientUserService } from '../../../../shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _http = inject(HttpClientUserService);
  constructor() { }

  public getAll(limit: number, offset: number){
    return this._http.searchTable(`/users/all`,limit ,offset);
  }

  public new(data: any) {
    return this._http.post(`/users/create`, data);
  }

  public getAllRoles(){
    return this._http.get(`/roles/list`);
  }

  public getAllCompanies(){
    return this._http.get(`/companies/list`);
  }

}
