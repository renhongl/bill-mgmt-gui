import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  keepAlive() {
    if (!localStorage.getItem('bill-user')) {
      return;
    }
    const username = JSON.parse(localStorage.getItem('bill-user')).username;
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.AUTH_KEEP_ALIVE, {username}, options);
  }
}
