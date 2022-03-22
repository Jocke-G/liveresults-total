import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';

import { CompetitionInfo } from 'src/app/services/liveresults/models';
import { fetchCompetition } from 'src/app/store/competition/competition.actions';
import { selectCompetition } from 'src/app/store/competition/competition.selectors';

@Injectable({
  providedIn: 'root'
})
export class TotalClassResultsFacadeService {

  constructor(
    private store: Store,
  ) {
  }

  getCompetitionInfo(competitionId: string):Observable<CompetitionInfo> {
    this.store.dispatch(fetchCompetition({ comppetitionId: competitionId }));
    return this.store.select(selectCompetition(competitionId))
      .pipe(
        filter((competition: CompetitionInfo | undefined): competition is CompetitionInfo => competition !== undefined),
      );
  }
}
