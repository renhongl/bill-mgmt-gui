import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) {

  }

  getAllUni() {
    let headers = new HttpHeaders({
      'token': localStorage.getItem('bill-token'),
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:3000/university/all', options);
  }
}
