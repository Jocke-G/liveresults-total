import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassResults } from './models/class-result';

@Injectable({
  providedIn: 'root'
})
export class LiveresultsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getClassResults(competitionId: string, className: string) {
    return this.http.get<ClassResults>(`https://liveresultat.orientering.se/api.php?method=getclassresults&comp=${competitionId}&class=${className}&unformattedTimes=false`);
  }
}
