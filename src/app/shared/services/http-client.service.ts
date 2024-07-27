import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientUserService {
  private readonly _http = inject(HttpClient);
  private errors = [400,500,404]

  constructor() { }
  public get(path: string) {
    return this._http.get(`${environment.api}${path}`).pipe(
      map((response: any) => {
        if (response.status === 404 || response.status === 500) {
          throw { error: response, status: response.status };
        }
        return response;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }


  public searchTable(path: string, limit: number, offset: number) {
    let params = new HttpParams()
    .set('limit', limit.toString())
    .set('offset', offset.toString());
    return this._http.get(`${environment.api}${path}`, {
      params: params,
    }).pipe(
      map((response: any) => {
        if (this.errors.includes(response.status)) {
          throw { error: response, status: response.status };
        }
        return response;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  public post(path: string, data: any) {
    return this._http.post(`${environment.api}${path}`, data).pipe(
      map((response: any) => {
        if (this.errors.includes(response.status)) {
          throw { error: response, status: response.status };
        }
        return response;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  public update(path: string, data: any) {
    return this._http.patch(`${environment.api}${path}`, data).pipe(
      map((response: any) => {
        if (this.errors.includes(response.status)) {
          throw { error: response, status: response.status };
        }
        return response;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  public delete(path: string) {
    return this._http.delete(`${environment.api}${path}`).pipe(
      map((response: any) => {
        if (this.errors.includes(response.status)) {
          throw { error: response, status: response.status };
        }
        return response;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

}