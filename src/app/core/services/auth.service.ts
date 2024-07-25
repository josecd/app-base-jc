import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.verifyToken()
   }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  async verifyToken(){
    try {
      await this._http.get(`${environment.api}/auth/verify`).toPromise();
    } catch (error) {
      this.logout()
    }
  }

  login(data:{email:string, password:string}) {
    return this._http.post(`${environment.api}/auth/login`, data);
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
