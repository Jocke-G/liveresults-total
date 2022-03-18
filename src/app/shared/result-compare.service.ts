import { Injectable } from '@angular/core';

import { TotalResult } from '../components/total-class-results/total-result';
import { TimeService } from './time.service';
import {
  Result,
  ResultStatus,
} from 'src/app/services/liveresults/models';

const A_BEFORE_B: number = -1;
const B_BEFORE_A: number = 1;
const EQUAL: number = 0;

@Injectable({
  providedIn: 'root'
})
export class ResultCompareService {

  constructor(
    private timeService: TimeService,
  ) {
  }

  compareResults = (a: Result, b: Result): number => {
    if(this.resultOk(a) && this.resultOk(b)) {
      return this.getEffectiveTime(a) - this.getEffectiveTime(b);
    }

    if(this.resultOk(a) && !this.resultOk(b)) {
      return A_BEFORE_B;
    }

    if(this.resultOk(b) && !this.resultOk(a)) {
      return B_BEFORE_A;
    }

    return EQUAL;
  }

  private resultOk(a: Result) {
    return a.status === ResultStatus.OK || a.status === ResultStatus.NOT_STARTED_YET_10;
  }

  private getEffectiveTime(a: Result): number {
    if (a.status === ResultStatus.OK) {
      return parseFloat(a.result);
    } else {
      return this.timeService.getTime() - a.start;
    }
  }

  compareTotalResults(competitionIds: string[]) {
    return (a: TotalResult, b: TotalResult): number => {
      let previousResult = EQUAL;
      for (let competitionId of competitionIds) {
        let aStage = a.results.get(competitionId);
        let bStage = b.results.get(competitionId);

        if(aStage?.totalOk && bStage?.totalOk) {
          previousResult = a.totalTime - b.totalTime;
          continue;
        }

        if(aStage?.totalOk && !bStage?.totalOk) {
          return A_BEFORE_B;
        }

        if(!aStage?.totalOk && bStage?.totalOk) {
          return B_BEFORE_A;
        }

        if(!aStage?.totalOk && !bStage?.totalOk) {
          return previousResult;
        }
      }
      return previousResult;
    }
  }
}
