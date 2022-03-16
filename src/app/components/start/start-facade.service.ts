import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import {
  ClassInfo,
  CompetitionInfo,
} from 'src/app/services/liveresults/models';
import { fetchCompetitions } from 'src/app/store/competition/competition.actions';
import { selectAllCompetitions } from 'src/app/store/competition/competition.selectors';
import { LiveresultsService } from 'src/app/services/liveresults/liveresults.service';

@Injectable({
  providedIn: 'root'
})
export class StartFacadeService {

  constructor(
    private store: Store,
    private service: LiveresultsService
  ) {
  }

  getClasses(competitionId: string): Observable<ClassInfo[]> {
    return this.service.getClasses(competitionId).pipe(
      map(classCollection => classCollection.classes),
    );
  }

  getCompetitions(): Observable<CompetitionInfo[]> {
    this.store.dispatch(fetchCompetitions());
    return this.store.select(selectAllCompetitions);
  }
}
