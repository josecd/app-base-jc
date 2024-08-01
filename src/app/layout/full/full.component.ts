import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, shareReplay, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { routes } from '../../app.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css'],
  standalone: true,
  imports:[
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatMenuModule,
    MatExpansionModule
  ]
})
export class FullComponent implements OnInit {
  public _user = inject(UserService)

  private breakpointObserver = inject(BreakpointObserver);
  rootRoutes = routes.filter((r) => r.path);
  listMenu: any = [];
  name: any = 'Nombre';
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor() {}

  ngOnInit(): void {
    this.name = 'Nombre';
    this.listMenu =[
      { title: 'Dashboard', path: '/dashboard', icon:"home" },
      { title: 'Adiministración', path: '/users',
        icon:"group",
        children: [
        { title: 'Usuarios', path: '/usuarios', icon:"person" },
        { title: 'Empresas', path: '/empresas', icon:"apartment" },
        { title: 'Roles', path: '/roles', icon:"supervisor_account" },
        { title: 'Permisos', path: '/permisos', icon:"manage_accounts" },
        { title: 'Modulos', path: '/modulos', icon:"view_module" },
      ]},
      { title: 'Catalogos', path: '/catalogos',
        icon:"group",
        children: [
        { title: 'Tipos', path: '/catalogos/tipos', icon:"person" },
        { title: 'Catalogos', path: '/catalogos/lista', icon:"apartment" },
      ]},
      { title: 'Settings', path: '/settings', icon:"settings" }
    ];
  }
  logout() {
    this._user.logout()
  }

}
