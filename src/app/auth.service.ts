import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAuthenticatedUser() {
    throw new Error('Method not implemented.');
  }
  private isAuthenticated: boolean = false; 
  constructor() { }
   isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
   }
   
  login(data: any): boolean {
    if (data.email === 'rishit@kevit.io' && data.password === '123') {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    localStorage.setItem('isAuthenticated', 'false');
    return false;
   }
  
  logout(): void {
    this.isAuthenticated = false;
  }
}
