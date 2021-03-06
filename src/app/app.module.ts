import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Sentry from "@sentry/angular";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { EnvServiceProvider } from './services/environment/env.service.provider';
import { PagesModule } from './pages/pages.module';
import { RootStoreModule } from './store/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PagesModule,
    DialogsModule,
    RootStoreModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    EnvServiceProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
