import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ClassResult,
  CompetitionInfo,
  CompetitionCollection,
  ClassCollection,
} from './models';
import { EnvService } from './../environment/env.service';

@Injectable({
  providedIn: 'root'
})
export class LiveresultsService {

  private rootUrl:string = '';

  constructor(
    private http: HttpClient,
    envService: EnvService,
  ) {
    this.rootUrl = envService.liveresultsServer;
  }

  getClasses(competitionId: string): Observable<ClassCollection> {
    return this.http.get<ClassCollection>(`${this.rootUrl}/api.php?method=getclasses&comp=${competitionId}`);
  }

  getClassResults(competitionId: string, className: string, unformattedTimes: boolean = false): Observable<ClassResult> {
    return this.http.get<ClassResult>(`${this.rootUrl}/api.php?method=getclassresults&comp=${competitionId}&class=${className}&unformattedTimes=${unformattedTimes?'true':'false'}`);
  }

  getCompetitionInfo(competitionId: string): Observable<CompetitionInfo> {
    return this.http.get<CompetitionInfo>(`${this.rootUrl}/api.php?method=getcompetitioninfo&comp=${competitionId}`);
  }

  getCompetitions():Observable<CompetitionCollection> {
    return this.http.get<CompetitionCollection>(`${this.rootUrl}/api.php?method=getcompetitions`);
  }
}
