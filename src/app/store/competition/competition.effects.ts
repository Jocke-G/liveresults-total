import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { concatMap, map, Observable, withLatestFrom } from "rxjs";
import { LiveresultsService } from "src/app/services/liveresults/liveresults.service";
import { CompetitionCollection } from "src/app/services/liveresults/models";

import { fetchCompetitions, loadCompetitions } from "./competition.actions";
import { selectAllCompetitions } from "./competition.selectors";

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

  private doGetCompetitions(): Observable<CompetitionCollection> {
    return this.service.getCompetitions();
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private service: LiveresultsService,
  ) {
  }
}
