import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    address: '',
    mobile: '',
    role: ''
  };
  signUpError = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSignUp(): Promise<void> {
    try {
      await firstValueFrom(this.authService.signUp(this.user));
      alert('Sign-up successful! Please log in.');
      this.router.navigate(['/signin']);
    } catch (error) {
      console.error('Sign-up failed', error);
      this.signUpError = 'Sign-up failed. Please try again.';
    }
  }
}
