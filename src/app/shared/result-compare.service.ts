import { Injectable } from '@angular/core';
import { TotalResult } from '../components/total-class-results/total-result';

const A_BEFORE_B: number = -1;
const B_BEFORE_A: number = 1;
const EQUAL: number = 0;

@Injectable({
  providedIn: 'root'
})
export class ResultCompareService {

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
