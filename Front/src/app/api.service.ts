import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  generateToken(): Observable<any> {
    return this.http.get('http://localhost:3000/generate-token');
  }

  // Assure-toi que la réponse est traitée comme un Blob
  downloadImage(): Observable<Blob> {
    return this.http.get('http://localhost:3000/download', { responseType: 'blob' });
  }
}
