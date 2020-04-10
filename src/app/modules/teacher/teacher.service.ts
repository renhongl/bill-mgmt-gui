import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {

  }

  updateTeacher(id: string, name: string, uni: string, phone) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put(URL.TEACHER, {
      id,
      name,
      uni,
      phone
    }, options);
  }

  createTeacher(name: string, uni: string, phone: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.TEACHER, {
      name,
      uni,
      phone
    }, options);
  }

  searchTeacherByUni(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.TEACHER_SEARCH_UNI, {
      index,
      total,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  searchTeacher(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.TEACHER_SEARCH, {
      index,
      total,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  deleteTeacher(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.delete(`${URL.TEACHER}/${id}`, options);
  }
}
