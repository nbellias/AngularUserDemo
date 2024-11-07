import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignIn(): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.authService.signIn(this.username, this.password));
      this.authService.saveResponseWithToken(response.id, response.jwtToken);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
