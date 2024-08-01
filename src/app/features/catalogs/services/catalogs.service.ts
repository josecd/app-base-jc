import { inject, Injectable } from '@angular/core';
import { HttpClientUserService } from 'app/shared/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private readonly _http = inject(HttpClientUserService);
  constructor() { }

  public getAll(limit: number, offset: number){
    return this._http.searchTable(`/catalog/all`,limit ,offset);
  }

  public getAllTypes(limit: number, offset: number){
    return this._http.searchTable(`/catalog/all-types`,limit ,offset);
  }

  public new(data: any) {
    return this._http.post(`/catalog/create`, data);
  }

  public newType(data: any) {
    return this._http.post(`/catalog/create-types`, data);
  }

  public getTypes(){
    return this._http.get(`/catalog/list-types`);
  }
}
