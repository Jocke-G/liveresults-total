import { Injectable } from '@angular/core';
import { TotalResult } from '../components/total-class-results/total-result';
import { ClassResults, Result } from '../services/liveresults/models';
import { StageResult } from './../components/total-class-results/stage-result';

@Injectable({
  providedIn: 'root'
})
export class TotalResultConverterService {

  merge(totalResults: TotalResult[], current: [string, ClassResults]) {
    current[1].results.forEach(result => {
      this.addStageResult(totalResults, result, current[0])
    });
    return totalResults;
  }

  private addStageResult(totalResults: TotalResult[], result: Result, competitionId: string) {
    const existingResult = totalResults.find(x => x.name == result.name && x.club == result.club)
    if(existingResult) {
      this.appendTotalResult(existingResult, competitionId, result);
    } else {
      totalResults.push(this.createTotalResult(competitionId, result))
    }
  }

  private appendTotalResult(existingResult: TotalResult, competitionId: string, result: Result): void {
    existingResult.results.set(competitionId, this.createStageResult(result));
  }

  private createTotalResult(competitionId: string, result: Result): TotalResult {
    return <TotalResult> {
      club: result.club,
      name: result.name,
      results: new Map([[competitionId, this.createStageResult(result)]]),
    };
  }

  private createStageResult(result: Result): StageResult {
    return <StageResult>{
      status: result.status,
      time: parseInt(result.result),
    }
  }
}