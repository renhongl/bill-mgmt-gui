import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  updateUser(id: string, username: string, mail: string, password: string, auth: number) {
    const user = JSON.parse(localStorage.getItem('bill-user'));
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put(`${URL.USER}/${user._id}`, {
      id,
      username,
      mail,
      auth,
    }, options);
  }

  createUser(username: string, mail: string, password: string, auth: number) {
    const user = JSON.parse(localStorage.getItem('bill-user'));
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(`${URL.USER}/${user._id}`, {
      username,
      mail,
      password,
      auth,
      createDate: Date.now(),
    }, options);
  }

  searchUser(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const user = JSON.parse(localStorage.getItem('bill-user'));
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.USER_SEARCH, {
      index,
      total,
      id: user._id,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  deleteUser(id: string) {
    const user = JSON.parse(localStorage.getItem('bill-user'));
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(`${URL.USER_DELETE}/${user._id}`, {
      id,
    }, options);
  }
}
