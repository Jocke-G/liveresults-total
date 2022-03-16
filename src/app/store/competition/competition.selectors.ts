import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCompetition from './competition.reducer'

export const state = createFeatureSelector<fromCompetition.State>(
  fromCompetition.featureKey
);

export const selectAllCompetitions = createSelector(
  state,
  fromCompetition.selectAll
)
