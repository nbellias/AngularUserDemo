import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {firstValueFrom} from 'rxjs';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Initialize the form group with controls and their default values
    this.profileForm = this.fb.group({
      username: [''],
      firstname: [''],
      lastname: [''],
      dateOfBirth: [''],
      address: [''],
      mobile: [''],
      role: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadUserData();
  }

  // Load the user data and populate the form
  async loadUserData(): Promise<void> {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      try {
        this.user = await firstValueFrom(this.authService.getUserProfile(userId.toString()));
        this.profileForm.patchValue(this.user); // Fill form with user data
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    }
  }

  // Submit the updated profile data
  async onSubmit(): Promise<void> {
    const userId = this.authService.getUserId();
    console.log(userId);
    if (this.profileForm.valid && userId !== null) {
      try {
        const response = await firstValueFrom(this.authService.updateUserProfile(userId.toString(), this.profileForm.value));
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Failed to update profile', error);
      }
    }
  }
}
