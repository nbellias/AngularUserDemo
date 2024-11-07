import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIdAndTokenKey = 'userIdAndJwtToken';

  private url = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  signIn(username: string, password: string) {
    return this.http.post(`${this.url}/login`, { username, password });
  }

  signUp(userData: any) {
    return this.http.post(`${this.url}/signup`, userData);
  }

  saveResponseWithToken(userId: number, token: string): void {
    localStorage.setItem(this.userIdAndTokenKey, JSON.stringify({
      'userId': userId,
      'token': token
    }));
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.userIdAndTokenKey);
    if (token !== null) {
      return JSON.parse(token).token;
    } else {
      return null;
    }
  }

  getUserId(): number | null {
    const token = localStorage.getItem(this.userIdAndTokenKey);
    if (token !== null) {
      return JSON.parse(token).userId;
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.userIdAndTokenKey);
    this.router.navigate(['/signin']);
  }

  getUserProfile(id: string) {
    return this.http.get(`${this.url}/fetch/${id}`); // Adjust endpoint as necessary
  }

  updateUserProfile(id: string, userData: any) {
    return this.http.put(`${this.url}/update/${id}`, userData); // Adjust endpoint as necessary
  }
}
