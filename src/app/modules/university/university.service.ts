import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

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
    return this.http.put(URL.UNIVERSITY, {
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
    return this.http.post(URL.UNIVERSITY, {
      name,
      address,
    }, options);
  }

  searchUni(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.UNIVERSITY_SEARCH, {
      index,
      total,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  deleteUni(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.delete(`${URL.UNIVERSITY}/${id}`, options);
  }
}
