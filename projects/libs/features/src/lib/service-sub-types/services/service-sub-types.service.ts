import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@libs/api';
import { Observable } from 'rxjs';
import { ServiceSubType, ServiceSubTypeForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ServiceSubTypesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = `${inject(API_CONFIG).apiUrl}/ServiceSubTypes`;

  getAll(): Observable<ServiceSubType[]> {
    return this._httpClient.get<ServiceSubType[]>(this.API_URL);
  }

  getById(id: number): Observable<ServiceSubType> {
    return this._httpClient.get<ServiceSubType>(`${this.API_URL}`, { params: { id } });
  }

  add(value: ServiceSubTypeForm): Observable<number> {
    return this._httpClient.put<number>(this.API_URL, value);
  }

  update(value: ServiceSubTypeForm): Observable<Object> {
    return this._httpClient.put(this.API_URL, value);
  }
}
