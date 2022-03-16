import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import * as fromCompetition from './competition.reducer'
import { CompetitionEffects } from './competition.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCompetition.featureKey, fromCompetition.reducer),
    EffectsModule.forFeature([CompetitionEffects])
  ]
})
export class CompetitionModule { }
