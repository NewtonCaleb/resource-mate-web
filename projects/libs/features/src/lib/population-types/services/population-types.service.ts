import { inject, Injectable } from '@angular/core';
import { PopulationType, PopulationTypeForm } from '../types';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '@libs/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopulationTypesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly API_URL = `${inject(API_CONFIG).apiUrl}/PopulationTypes`;

  getAll(): Observable<PopulationType[]> {
    return this._httpClient.get<PopulationType[]>(this.API_URL);
  }

  getById(id: number): Observable<PopulationType> {
    return this._httpClient.get<PopulationType>(`${this.API_URL}`, { params: { id } });
  }

  add(value: PopulationTypeForm): Observable<number> {
    return this._httpClient.put<number>(this.API_URL, value);
  }

  update(value: PopulationTypeForm): Observable<Object> {
    return this._httpClient.put(this.API_URL, value);
  }
}
