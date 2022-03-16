import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CompetitionInfo } from "src/app/services/liveresults/models";
import * as CompetitionActions from './competition.actions';

export const featureKey = 'competition';

export interface State extends EntityState<CompetitionInfo> {
}

export const adapter: EntityAdapter<CompetitionInfo> = createEntityAdapter<CompetitionInfo>();

export const initialState: State = adapter.getInitialState({
});

export const reducer = createReducer(
  initialState,
  on(CompetitionActions.loadCompetitions,
    (state, action) => adapter.upsertMany(action.competitions, state))
)

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
