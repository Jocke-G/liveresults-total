import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCompetition from './competition.reducer'

export const state = createFeatureSelector<fromCompetition.State>(
  fromCompetition.featureKey
);

export const selectAllCompetitions = createSelector(
  state,
  fromCompetition.selectAll
)

export const selectEntities = createSelector(
  state,
  fromCompetition.selectEntities
)

export const selectCompetition = (id: string) => createSelector(
  selectEntities,
  entities => entities[id]
);
