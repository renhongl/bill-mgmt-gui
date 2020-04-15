import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getTotalMaterial(timestamp: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TOTAL}/${timestamp}`, options);
  }

  getTopStudentMaterial(timestamp: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TOP_STUDENT}/${timestamp}`, options);
  }

  getTopTeacherMaterial(timestamp: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TOP_TEACHER}/${timestamp}`, options);
  }

  getTopUniMaterial(timestamp: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TOP_UNI}/${timestamp}`, options);
  }

  getTrendUniMaterial(timestamp: string, monthly: boolean) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TREND_UNI}/${timestamp}/${monthly}`, options);
  }

  getTrendTeacherMaterial(timestamp: string, monthly: boolean) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.get(`${URL.MATERIAL_TREND_TEACHER}/${timestamp}/${monthly}`, options);
  }
}
