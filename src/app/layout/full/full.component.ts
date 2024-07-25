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
    this.listMenu = [
      { title: 'Home', path: '/home' },
      { title: 'Usuarios', path: '/usuarios' },
    ];
  }
  logout() {
    this._user.logout()
  }

}
