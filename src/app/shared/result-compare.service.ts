import { Injectable } from '@angular/core';
import { TotalResult } from '../components/total-class-results/total-result';

import { Result } from '../services/liveresults/models';

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
      if (a.total !== 0 && b.total !== 0) {
        this.logTotal(a, b, "Both TotalResult OK, comparing time");
        return this.compareTime(a.total, b.total);
      }

      if (a.total !== 0) {
        this.logTotal(a, b, "A TotalResult OK A_BEFORE_B");
        return A_BEFORE_B;
      }

      if (b.total !== 0) {
        this.logTotal(a, b, "B TotalResult OK B_BEFORE_A");
        return B_BEFORE_A;
      }

      for (let competitionId of competitionIds) {
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

  compareResults(a: Result | undefined, b: Result | undefined): number {
    if(a === undefined && b === undefined) {
      this.logResult(a, b, `Both undefined, EQUAL`)
      return EQUAL;
    }

    if(a === undefined) {
      return B_BEFORE_A;
    }

    if(b === undefined) {
      return A_BEFORE_B;
    }

    if(a?.status !== 0 && b?.status !== 0) {
      this.logResult(a, b, `Comparing times`)
      return this.compareTime(parseInt(a.result), parseInt(b.result));
    }

    if(a?.status === 0) {
      return A_BEFORE_B;
    }

    if(b?.status === 0) {
      return B_BEFORE_A;
    }

    this.logResult(a, b, `Result Else, EQUAL`)
    return EQUAL;
  }

  compareTime(a: number, b: number): number {
    const result = a - b;
    //console.log(`Time comparing result: ${result}`)
    return result;
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

  private logResult(a: Result | undefined, b: Result | undefined, message: string) {
    if(!this.isStalked(a, b))
      return;

    console.log(message);
  }

  private isStalked(a: Result | undefined, b: Result | undefined): boolean {
    if(this.stalkA === undefined && this.stalkB === undefined)
      return false;
    if(!this.stalkB)
      return a?.name === this.stalkA
        || b?.name === this.stalkB

    return a?.name === this.stalkA
      || b?.name === this.stalkA
      || a?.name === this.stalkB
      || b?.name === this.stalkB
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
