import { createAction, props } from "@ngrx/store";
import { CompetitionInfo } from "src/app/services/liveresults/models";

export const fetchCompetitions = createAction('Fetch Competitions');
export const loadCompetitions = createAction('Load Competitions', props<{ competitions: CompetitionInfo[] }>());
