import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@libs/api';
import { Observable } from 'rxjs';
import { ServiceType, ServiceTypeForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = `${inject(API_CONFIG).apiUrl}/ServiceTypes`;

  getAll(): Observable<ServiceType[]> {
    return this._httpClient.get<ServiceType[]>(this.API_URL);
  }

  getById(id: number): Observable<ServiceType> {
    return this._httpClient.get<ServiceType>(`${this.API_URL}`, { params: { id } });
  }

  add(value: ServiceTypeForm): Observable<number> {
    return this._httpClient.put<number>(this.API_URL, value);
  }

  update(value: ServiceTypeForm): Observable<Object> {
    return this._httpClient.put(this.API_URL, value);
  }
}
