import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import URL from '../../utils/url';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) {

  }

  updateMaterialPrice(id: string, price: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
    };
    return this.http.put(URL.MATERIAL, {
      id,
      price,
    }, options);
  }

  updateMaterial(id: string, student: string, teacher: string, uni: string, content: string, price: string, pickUpTime?: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
    };
    return this.http.put(URL.MATERIAL, {
      id,
      student,
      content,
      price,
      teacher,
      pickUpTime,
      uni,
    }, options);
  }

  createMaterial(student: string, teacher: string, uni: string, content: string, price: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
    };
    return this.http.post(URL.MATERIAL, {
      student,
      uni,
      content,
      teacher,
      price,
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

  getMaterial(id: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
    };
    return this.http.get(`${URL.MATERIAL_GET}/${id}`, options);
  }

  downloadMaterial(date: string, type: string) {
    const headers = new HttpHeaders({
      token: localStorage.getItem('bill-token'),
    });
    const options = {
      headers,
    };
    return this.http.post(URL.MATERIAL_DOWNLOAD, {
      date,
      type,
    }, options);
  }
}
