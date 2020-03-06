import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(userName, password) {
    return this.http.post('http://localhost:3000/auth/login', {
      username: userName,
      password,
    });
  }

  getCode(userName, mail) {
    return this.http.post('http://localhost:3000/auth/mail', {
      username: userName,
      mail,
    });
  }

  register(userName, password, mail, code) {
    return this.http.post('http://localhost:3000/auth/register', {
      username: userName,
      password,
      mail,
      code,
    });
  }

  logout(): void {
    
  }
}
