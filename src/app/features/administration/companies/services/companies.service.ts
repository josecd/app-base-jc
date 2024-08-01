import { inject, Injectable } from '@angular/core';
import { HttpClientUserService } from '../../../../shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly _http = inject(HttpClientUserService);
  constructor() { }

  public getAll(limit: number, offset: number){
    return this._http.searchTable(`/companies/all`,limit ,offset);
  }

  public new(data: any) {
    return this._http.post(`/companies/create`, data);
  }


  public getAllTypes(){
    return this._http.get(`/catalogs/types/all`);
  }
}
