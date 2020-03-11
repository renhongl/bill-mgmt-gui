import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) {

  }

  updateUni(id: string, name: string, address: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put('http://localhost:3000/university', {
      id,
      name,
      address,
    }, options);
  }

  createUni(name: string, address: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post('http://localhost:3000/university', {
      name,
      address,
    }, options);
  }

  searchUni(index: number, total: number, searchWord: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post('http://localhost:3000/university/search', {
      index,
      total,
      searchWord,
    }, options);
  }

  deleteUni(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.delete(`http://localhost:3000/university/${id}`, options);
  }
}
