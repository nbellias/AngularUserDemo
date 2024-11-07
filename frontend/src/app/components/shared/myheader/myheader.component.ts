import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {AuthService} from '../../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-myheader',
  standalone: true,
    imports: [
        MatButton,
        MatToolbar,
        RouterModule,
        CommonModule
    ],
  templateUrl: './myheader.component.html',
  styleUrl: './myheader.component.css'
})
export class MyheaderComponent {
  constructor(public authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
