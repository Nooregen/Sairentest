import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  generateToken(captchaResponse: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/generate-token`, { captchaResponse });
  }

  downloadImage(): Observable<Blob> {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    return this.http.get(`${this.BASE_URL}/download`, { headers: headers, responseType: 'blob' });
  }
}
