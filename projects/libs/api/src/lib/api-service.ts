import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from './config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Dependency inject API_CONFIG (defined is app not lib).
  // This gives us the ability to be dynamic with the API url based on the profile selected.
  readonly baseUrl = inject(API_CONFIG).apiUrl;
  readonly client = inject(HttpClient);
}
