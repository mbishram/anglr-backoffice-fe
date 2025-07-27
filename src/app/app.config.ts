import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { Theme } from 'theme';
import { appRoutes } from 'app/app.routes';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AppTitleStrategy } from 'app/app-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Theme,
        options: {
          darkModeSelector: false,
        },
      },
    }),

    // Override default providers
    { provide: TitleStrategy, useClass: AppTitleStrategy },

    // Configuration override
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'shortDate' },
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'IDR' },

    // Global service
    MessageService,
  ],
};
