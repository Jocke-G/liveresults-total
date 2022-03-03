import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ClassResult,
  CompetitionInfo,
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

  getClassResults(competitionId: string, className: string, unformattedTimes: boolean = false): Observable<ClassResult> {
    return this.http.get<ClassResult>(`${this.rootUrl}/api.php?method=getclassresults&comp=${competitionId}&class=${className}&unformattedTimes=${unformattedTimes?'true':'false'}`);
  }

  getCompetitionInfo(competitionId: string): Observable<CompetitionInfo> {
    return this.http.get<CompetitionInfo>(`${this.rootUrl}/api.php?method=getcompetitioninfo&comp=${competitionId}`);
  }
}
