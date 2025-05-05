import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prevoznik } from '../model/prevoznik.model';

@Injectable({ providedIn: 'root' })
export class PrevoznikService {
  private api = 'http://localhost:3000/prevoznici';
  private http = inject(HttpClient);

  getAll(): Observable<Prevoznik[]> {
    return this.http.get<Prevoznik[]>(this.api);
  }

  getById(id: number): Observable<Prevoznik> {
    return this.http.get<Prevoznik>(`${this.api}/${id}`);
  }

  create(prevoznik: Prevoznik): Observable<Prevoznik> {
    return this.http.post<Prevoznik>(this.api, prevoznik);
  }

  update(id: number, prevoznik: Prevoznik): Observable<Prevoznik> {
    return this.http.put<Prevoznik>(`${this.api}/${id}`, prevoznik);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
