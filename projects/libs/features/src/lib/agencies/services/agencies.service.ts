import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_CONFIG } from '@libs/api';
import { Agency, AgencyForm } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {
  private readonly API_URL = `${inject(API_CONFIG).apiUrl}/Agencies`;
  private readonly _httpClient = inject(HttpClient);

  getAll(): Observable<Agency[]> {
    return this._httpClient.get<Agency[]>(this.API_URL);
  }

  add(agency: AgencyForm) {
    // console.log(agency);

    // return this.test$;
    return this._httpClient.post(this.API_URL, agency);
  }

  update(agency: AgencyForm) {
    return this._httpClient.put(this.API_URL, agency);
  }

  getById(id: number) {
    return this._httpClient.get<Agency | null>(`${this.API_URL}/${id}`);
  }
}
