import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home-users',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './home-users.component.html',
  styleUrl: './home-users.component.scss'
})
export default class HomeUsersComponent {

}
