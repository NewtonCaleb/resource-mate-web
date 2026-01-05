import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServiceForm } from '../types';
import { API_CONFIG } from '@libs/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private readonly API_URL = `${inject(API_CONFIG).apiUrl}/Services`;
  private readonly _httpClient = inject(HttpClient);

  getAll(): Observable<Service[]> {
    return this._httpClient.get<Service[]>(this.API_URL);
  }

  getById(id: number): Observable<Service | null> {
    return this._httpClient.get<Service | null>(`${this.API_URL}/${id}`);
  }

  update(value: ServiceForm): Observable<Object> {
    return this._httpClient.put(this.API_URL, value);
  }

  add(value: ServiceForm): Observable<number> {
    return this._httpClient.post<number>(this.API_URL, value);
  }
}
