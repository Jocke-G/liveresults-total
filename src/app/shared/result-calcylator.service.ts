import { Injectable } from '@angular/core';
import { TotalResult } from '../components/total-class-results/total-result';
import { ResultStatus } from '../services/liveresults/models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultCalcylateService {
  recalculateResult(totalResult: TotalResult, competitionIds: string[]) {
    let totalOk = true;
    let totalTime = 0;

    for (let competitionId of competitionIds) {
      const result = totalResult.results.get(competitionId);
      if(!totalOk) {
        break;
      }
      if(result === undefined) {
        totalOk=false;
        continue;
      }
      if(result.status !== ResultStatus.OK) {
        result.totalOk = false;
        totalOk = false;
        continue;
      }

      totalTime += result.time;
      result.totalTime = totalTime;
      result.totalOk = true
    }
    if(totalOk) {
      totalResult.totalTime = totalTime;
    }
    totalResult.totalOk = totalOk;
  }
}
