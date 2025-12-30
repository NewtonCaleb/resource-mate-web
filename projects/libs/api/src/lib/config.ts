import { InjectionToken } from '@angular/core';

// What is expected from the injection token
export interface ApiConfig {
  apiUrl: string;
}

// The actual injection data. Injection Token is expecting an obj that is of the ApiConfig interface.
// The 'ApiConfig' is just the key that is used to identify it.
export const API_CONFIG = new InjectionToken<ApiConfig>('ApiConfig');
