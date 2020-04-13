import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getUser() {
    const id = JSON.parse(localStorage.getItem('bill-user'))._id;
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.USER}/${id}`, options);
  }

  uploadFile(file: any, type: string) {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(`${URL.FILE}/${type}`, formData, options);
  }

  updateAccount(user: any) {
    const id = JSON.parse(localStorage.getItem('bill-user'))._id;
    const postData = user;
    postData.id = id;
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put(`${URL.USER}/null`, postData, options);
  }

}
