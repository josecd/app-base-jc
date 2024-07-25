import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private router = inject(Router);
  public user = signal("")
  constructor() {
    this.user.set(this.getUser() || "")
  }

  public setUserToken(data:{token:string, user:string}){
    localStorage.setItem("token",data.token)
    localStorage.setItem("user",data.user)
    this.user.set(data.user || "")
  }

  public getUser(){
    return localStorage.getItem("user")
  }

  public getToken(){
    return localStorage.getItem("token")
  }

  public logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
