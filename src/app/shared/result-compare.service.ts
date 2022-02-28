import { Injectable } from '@angular/core';
import { StageResult } from '../components/total-class-results/stage-result';
import { TotalResult } from '../components/total-class-results/total-result';

import { Result } from '../services/liveresults/models';
import { ResultStatus } from '../services/liveresults/models/result';

const A_BEFORE_B: number = -1;
const B_BEFORE_A: number = 1;
const EQUAL: number = 0;

@Injectable({
  providedIn: 'root'
})
export class ResultCompareService {

  private stalkA: string;
  private stalkB: string;

  compareTotalResults(competitionIds: string[]) {
    return (a: TotalResult, b: TotalResult): number => {
      this.logTotalObjects(a, b);
      if (this.bothTotalOk(a, b)) {
        this.logTotal(a, b, "Both TotalResult OK, comparing time");
        return this.compareTotalTime(a, b);
      }

      if (a.totalOk) {
        this.logTotal(a, b, "A totalOk A_BEFORE_B");
        return A_BEFORE_B;
      }

      if (b.totalOk) {
        this.logTotal(a, b, "B totalOk B_BEFORE_A");
        return B_BEFORE_A;
      }

      let cloneArray = [...competitionIds];
      cloneArray.reverse();
      for (let competitionId of cloneArray) {
        this.logTotal(a, b, `Comparing results for ${competitionId}`);
        let result = this.compareResults(a.results.get(competitionId), b.results.get(competitionId));
        this.logTotal(a, b, `Result for ${competitionId} ${result}`);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    };
  }

  compareResults(a: StageResult | undefined, b: StageResult | undefined): number {
    if(a === undefined && b === undefined) {
      this.logResult(a, b, `Both undefined, EQUAL`)
      return EQUAL;
    }

    if(a === undefined) {
      this.logResult(a, b, `A undefined, B_BEFORE_A`)
      return B_BEFORE_A;
    }

    if(b === undefined) {
      this.logResult(a, b, `B undefined, A_BEFORE_B`)
      return A_BEFORE_B;
    }

    if(a.status === 0 && b.status === 0) {
      this.logResult(a, b, `Comparing times`)
      return this.compareTime(a, b);
    }
    this.logResult(a, b, `cont`)


    if(a?.status === 0) {
      this.logResult(a, b, `A status 0, A_BEFORE_B`)
      return A_BEFORE_B;
    }

    if(b?.status === 0) {
      this.logResult(a, b, `B status 0, B_BEFORE_A`)
      return B_BEFORE_A;
    }

    this.logResult(a, b, `Result Else, EQUAL`)
    return EQUAL;
  }

  compareTotalTime(a: TotalResult, b: TotalResult): number {
    const result = a.totalTime - b.totalTime;
    this.logTotal(a, b, `a: ${a.totalTime} b: ${b.totalTime} result: ${result} ${this.whoFirst(result)}`);
    return result;
  }

  compareTime(a: StageResult, b: StageResult): number {
    const result = a.totalTime - b.totalTime;
    this.logResult(a, b, `a: ${a.totalTime} b: ${b.totalTime} result: ${result} ${this.whoFirst(result)}`);
    return result;
  }

  private whoFirst(result: number): string {
    if(result === 0) {
      return 'EQUAL';
    } else if(result < 1) {
      return 'A_BEFORE_B';
    } else {
      return 'B_BEFORE_A';
    }
  }

  private bothTotalOk(a: TotalResult, b: TotalResult) {
    return this.totalIsOk(a) && this.totalIsOk(b);
  }

  private totalIsOk(b: TotalResult) {
    return b.totalOk;
  }

  private logTotalObjects(a: TotalResult, b: TotalResult): void {
    if(!this.isStalkedTotal(a, b))
      return;

    console.log(`Comparing ${a.name} against ${b.name}`);
    console.log('a', a);
    console.log('b', b);
  }

  private logTotal(a: TotalResult, b: TotalResult, message: string) {
    if(!this.isStalkedTotal(a, b))
      return;

    console.log(message);
  }

  private logResult(a: StageResult | undefined, b: StageResult | undefined, message: string) {
    // if(!this.isStalked(a, b))
    //   return;

    console.log(message);
  }

  private isStalkedTotal(a: TotalResult, b: TotalResult): boolean {
    if(this.stalkA === undefined && this.stalkB === undefined)
      return false;
    if(!this.stalkB)
      return a.name === this.stalkA
        || b.name === this.stalkA;

    return (a.name === this.stalkA && b.name === this.stalkB)
      || (a.name === this.stalkB && b.name === this.stalkA);
  }
}
