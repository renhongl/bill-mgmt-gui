import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {

  }

  updateStudent(id: string, name: string, uni: string, teacher: string, phone: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put(URL.STUDENT, {
      id,
      name,
      uni,
      teacher,
      phone
    }, options);
  }

  createStudent(name: string, uni: string, teacher: string, phone: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.STUDENT, {
      name,
      uni,
      teacher,
      phone
    }, options);
  }

  searchStudent(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.STUDENT_SEARCH, {
      index,
      total,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  deleteStudent(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.delete(`${URL.STUDENT}/${id}`, options);
  }
}
