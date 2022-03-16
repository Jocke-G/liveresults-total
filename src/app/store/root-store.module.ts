import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromRootReducer from './root-store.reducers';
import { RootStoreEffects } from './root-store.effects';
import { CompetitionModule } from './competition/competition.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(fromRootReducer.reducerMap),
    EffectsModule.forRoot([RootStoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 250,
      name: 'LIVE Results',
    }),
    CompetitionModule,
  ]
})
export class RootStoreModule { }
