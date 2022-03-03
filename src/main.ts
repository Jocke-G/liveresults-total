import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const browserWindow = (window as { [key: string]: any }) || {};
const browserWindowEnv = browserWindow['__env'] || {};
const sentryDsn = browserWindowEnv.sentry_dsn;

if(sentryDsn) {
  const sentry_environment = browserWindowEnv.sentry_environment;

  Sentry.init({
    dsn: sentryDsn,
    integrations: [
      new BrowserTracing({
        tracingOrigins: ["localhost"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    environment:sentry_environment,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
