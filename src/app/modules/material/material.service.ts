import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) {

  }

  updateMaterial(id: string, name: string, teacher: string, uni: string, content: string, price: string, phone: string, pickUpTime?: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.put(URL.MATERIAL, {
      id,
      name,
      content,
      price,
      teacher,
      pickUpTime,
      uni,
      phone
    }, options);
  }

  createMaterial(name: string, teacher: string, uni: string, content: string, price: string, phone: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.MATERIAL, {
      name,
      uni,
      content,
      teacher,
      price,
      phone
    }, options);
  }

  searchMaterial(index: number, total: number, searchWord: string, sortKey: string, asc: number) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.post(URL.MATERIAL_SEARCH, {
      index,
      total,
      searchWord,
      sortKey,
      asc,
    }, options);
  }

  deleteMaterial(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
     };
    return this.http.delete(`${URL.MATERIAL}/${id}`, options);
  }
}
