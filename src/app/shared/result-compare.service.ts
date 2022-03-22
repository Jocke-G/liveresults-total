import { Injectable } from '@angular/core';

import {
  TotalResult,
} from 'src/app/components/total-class-results/model';
import {
  Result,
} from 'src/app/services/liveresults/models';
import { ResultHelperService } from './result-helper.service';

const A_BEFORE_B: number = -1;
const B_BEFORE_A: number = 1;
const EQUAL: number = 0;

@Injectable({
  providedIn: 'root',
})
export class ResultCompareService {

  constructor(
    private helper: ResultHelperService,
  ) {
  }

  compareResults = (a: Result, b: Result): number => {
    if(this.helper.resultOk(a) && this.helper.resultOk(b)) {
      return this.helper.getVirtualTime(a) - this.helper.getVirtualTime(b);
    }

    if(this.helper.resultOk(a) && !this.helper.resultOk(b)) {
      return A_BEFORE_B;
    }

    if(this.helper.resultOk(b) && !this.helper.resultOk(a)) {
      return B_BEFORE_A;
    }

    return EQUAL;
  }

  compareTotalResults(competitionIds: string[]) {
    return (a: TotalResult, b: TotalResult): number => {
      let previousResult = EQUAL;
      for (let competitionId of competitionIds) {
        let aStage = a.results.get(competitionId);
        let bStage = b.results.get(competitionId);

        if(this.helper.possiblyOk(aStage) && this.helper.possiblyOk(bStage)) {
          previousResult = ((aStage?.totalVirtualTime || 0) - (bStage?.totalVirtualTime || 0));
          continue;
        }

        if(this.helper.possiblyOk(aStage) && !this.helper.possiblyOk(bStage)) {
          return A_BEFORE_B;
        }

        if(!this.helper.possiblyOk(aStage) && this.helper.possiblyOk(bStage)) {
          return B_BEFORE_A;
        }

        if(!this.helper.possiblyOk(aStage) && !this.helper.possiblyOk(bStage)) {
          return previousResult;
        }
      }
      return previousResult;
    }
  }
}
