import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';

import { LiveresultsService } from 'src/app/services/liveresults/liveresults.service';
import { ClassInfo, CompetitionInfo } from 'src/app/services/liveresults/models';
import { fetchCompetition, fetchCompetitions } from 'src/app/store/competition/competition.actions';
import { selectAllCompetitions, selectCompetition } from 'src/app/store/competition/competition.selectors';

@Injectable({
  providedIn: 'root'
})
export class TotalClassResultsFacadeService {

  constructor(
    private store: Store,
    private service: LiveresultsService,
  ) {
  }

  getClasses(competitionId: string): Observable<ClassInfo[]> {
    return this.service.getClasses(competitionId).pipe(
      map(classCollection => classCollection.classes),
    );
  }

  getCompetitionInfo(competitionId: string):Observable<CompetitionInfo> {
    this.store.dispatch(fetchCompetition({ comppetitionId: competitionId }));
    return this.store.select(selectCompetition(competitionId))
      .pipe(
        filter((competition: CompetitionInfo | undefined): competition is CompetitionInfo => competition !== undefined),
      );
  }

  getCompetitions(): Observable<CompetitionInfo[]> {
    this.store.dispatch(fetchCompetitions());
    return this.store.select(selectAllCompetitions);
  }
}
