import { Component } from '@angular/core';
import {ProfileComponent} from './profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ProfileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
