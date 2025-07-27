import { Injectable } from '@angular/core';

/**
 * Service to handle apps logging. For now, use console.log.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * Log success action
   * @param {any} value - Result value
   * @param {string} action - Action done
   * @param {string} message - Custom message
   */
  success(value: any, action: string, message?: string) {
    console.log(message ?? '✅ Request successful!', action, value);
  }

  /**
   * Log error action
   * @param {any} value - Error value
   * @param {string} action - Action done
   * @param {string} message - Custom message
   */
  error(value: any, action: string, message?: string) {
    console.error(message ?? '⛔ Request failed!', action, value);
  }
}
