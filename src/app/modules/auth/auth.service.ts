import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  login(userName, password) {
    return this.http.post(URL.AUTH_LOGIN, {
      username: userName,
      password,
    });
  }

  getCode(userName, mail) {
    return this.http.post(URL.AUTH_MAIL, {
      username: userName,
      mail,
    });
  }

  register(userName, password, mail, code) {
    return this.http.post(URL.AUTH_REGISTER, {
      username: userName,
      password,
      mail,
      code,
      createDate: Date.now(),
    });
  }

  logout(): void {
    
  }
}
