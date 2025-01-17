import { inject, Injectable } from '@angular/core';
import { HttpClientUserService } from '../../../../shared/services/http-client.service';
@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private readonly _http = inject(HttpClientUserService);
  constructor() { }

  public getAll(limit: number, offset: number){
    return this._http.searchTable(`/modules/all`,limit ,offset);
  }

  public newModule(data: any) {
    return this._http.post(`/modules/create`, data);
  }

}
