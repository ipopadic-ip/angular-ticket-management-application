import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Karta } from '../model/karta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KartaService {
  private readonly apiUrl = 'http://localhost:3000/karte';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Karta[]> {
    return this.http.get<Karta[]>(this.apiUrl);
  }

  getById(id: number): Observable<Karta> {
    return this.http.get<Karta>(`${this.apiUrl}/${id}`);
  }

  getByPrevoznik(idPrevoznika: number): Observable<Karta[]> {
    return this.http.get<Karta[]>(`${this.apiUrl}?idPrevoznika=${idPrevoznika}`);
  }

  create(karta: Omit<Karta, 'id'>): Observable<Karta> {
    return this.http.post<Karta>(this.apiUrl, karta);
  }

  update(id: number, karta: Karta): Observable<Karta> {
    return this.http.put<Karta>(`${this.apiUrl}/${id}`, karta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
}
