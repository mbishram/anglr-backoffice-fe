import { Injectable } from '@angular/core';

/**
 * Service to handle apps logging. For now, use console.log.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  success(value: any, message?: string) {
    console.log(message ?? '✅ Request successful!', value);
  }

  error(value: any, message?: string) {
    console.error(message ?? '⛔ Request failed!', value);
  }
}
