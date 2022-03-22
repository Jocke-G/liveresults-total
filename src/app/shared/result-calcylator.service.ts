import { Injectable } from '@angular/core';

import { ResultStatus } from 'src/app/services/liveresults/models';
import { TotalResult } from 'src/app/components/total-class-results/model';

import { ResultHelperService } from './result-helper.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root',
})
export class ResultCalcylateService {

  constructor(
    private timeService: TimeService,
    private helper: ResultHelperService,
  ) {
  }

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
      result.previousOk = totalOk;
      if(result.status !== ResultStatus.OK) {
        const time = this.timeService.getTime();
        if(this.helper.possiblyOk(result) && result.start < time) {
          result.totalVirtualTime = time-result.start+totalTime;
        }
        result.totalOk = false;
        totalOk = false;
        continue;
      }

      const numResult = parseInt(result.result);
      totalTime += numResult >= 0 ? numResult : 0;
      result.totalTime = totalTime;
      result.totalVirtualTime = result.totalTime;
      result.totalOk = true
    }
    if(totalOk) {
      totalResult.totalTime = totalTime;
    }
    totalResult.totalOk = totalOk;
  }

  recalcylateRelativeResults(totalResults: TotalResult[], competitionIds: string[]) {
    for (let competitionId of competitionIds) {
      for (let totalResult of totalResults) {
        const result = totalResult.results.get(competitionId);
        if(!result) {
          continue;
        }

        if(this.helper.possiblyOk(result)) {
          const betterVirtualResults = this.getBetterVirtualResults(totalResults, competitionId, result.totalVirtualTime)
          result.totalVirtualPlace = (betterVirtualResults.length + 1).toString();
        }

        if(result.totalOk) {
          const betterResults = this.getBetterResults(totalResults, competitionId, result.totalTime)
          result.totalPlace = (betterResults.length + 1).toString();
          }
      }
    }
  }

  private getBetterResults(totalResults: TotalResult[], competitionId: string, totalTime: number) {
    return totalResults.filter(x => {
      const result = x.results.get(competitionId);
      if (result === undefined) {
        return false;
      }
      if (!result.totalOk) {
        return false;
      }
      return result.totalTime < totalTime;
    });
  }

  private getBetterVirtualResults(totalResults: TotalResult[], competitionId: string, totalVirtualTime: number) {
    return totalResults.filter(x => {
      const result = x.results.get(competitionId);
      if (result === undefined) {
        return false;
      }
      if (result.totalOk) {
        return result.totalTime < totalVirtualTime;
      }
      if (result.previousOk) {
        return result.totalVirtualTime < totalVirtualTime;
      }
      return false;
    });
  }
}
