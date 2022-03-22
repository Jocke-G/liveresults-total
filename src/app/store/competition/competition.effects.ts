import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, EMPTY, exhaustMap, map, mergeMap, Observable, of, withLatestFrom } from "rxjs";

import { LiveresultsService } from "src/app/services/liveresults/liveresults.service";
import { CompetitionCollection, CompetitionInfo } from "src/app/services/liveresults/models";

import {
  fetchCompetition,
  fetchCompetitions,
  loadCompetition,
  loadCompetitions,
} from "./competition.actions";
import { selectAllCompetitions, selectCompetition } from "./competition.selectors";

@Injectable()
export class CompetitionEffects {

  getCompetitions$ = createEffect(() => this.actions$.pipe(
    ofType(
      fetchCompetitions,
    ),
    withLatestFrom(this.store.select(selectAllCompetitions)),
    concatMap(([action, state]) => {
      return this.doGetCompetitions().pipe(
        map(_ => loadCompetitions({competitions: _.competitions}))
      );
    }),
  ));

  getCompetition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fetchCompetition,
      ),
      mergeMap((action) =>
        this.store.select(selectCompetition(action.comppetitionId)).pipe(
          exhaustMap((state) =>
            this.doGetCompetition(action.comppetitionId).pipe(
              mergeMap((result) => {
                if(state !== undefined) {
                  return EMPTY;
                }
                return of(loadCompetition({ competition: result }));
              })
            )
          ),
        ),
      ),
    ),
  );

  private doGetCompetitions(): Observable<CompetitionCollection> {
    return this.service.getCompetitions();
  }

  private doGetCompetition(competitionId: string): Observable<CompetitionInfo> {
    return this.service.getCompetitionInfo(competitionId);
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private service: LiveresultsService,
  ) {
  }
}
