import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, map, tap } from 'rxjs';

import {
  ClassResults,
  Result,
} from 'src/app/services/liveresults/models';
import { LiveresultsService } from 'src/app/services/liveresults/services';
import { ResultCompareService } from 'src/app/shared/result-compare.service';
import { TotalResult } from '../total-result';

@Component({
  selector: 'lrt-total-class-results',
  templateUrl: './total-class-results.component.html',
  styleUrls: ['./total-class-results.component.scss']
})
export class TotalClassResultsComponent implements OnInit, OnDestroy {

  @Input() className: string;
  @Input() competitionIds: string[];

  outResults$: Observable<TotalResult[]>

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
    private compareService: ResultCompareService,
  ) {
  }

  ngOnInit(): void {
    const classResultsList$: Observable<[string, ClassResults]>[] = this.competitionIds.map(competitionId =>
      this.service.getClassResults(competitionId, this.className, true)
      .pipe(
        map(_ => {
          var tuple: [string, ClassResults] = [competitionId, _];
          return tuple;
        })
      )
    );
    const classResults$: Observable<[string, ClassResults][]> = forkJoin(classResultsList$);

    this.outResults$ = classResults$.pipe(
      map((tuples: [string, ClassResults][]) => {
        const res = tuples.reduce((previousValue, currentValue) => this.merge(previousValue, currentValue), [] as TotalResult[])
        res.map(_ => this.recalculateResult(_))
        return res.sort(this.compareService.compareTotalResults(this.competitionIds));
      }),
      tap(_ => console.log(_)),
    );
  }

  private merge(previous: TotalResult[], current: [string, ClassResults]) {
    current[1].results.forEach(result => {
      this.add(previous, result, current[0])
    });
    return previous;
  }

  private add(previous: TotalResult[], current: Result, competitionId: string) {
    const existingResult = previous.find(x => x.name == current.name && x.club == current.club)
    if(existingResult) {
      this.appendResult(existingResult, competitionId, current);
    } else {
      previous.push(this.createTotalResult(competitionId, current))
    }
  }

  private appendResult(existingResult: TotalResult, competitionId: string, result: Result) {
    existingResult.results.set(competitionId, result);
  }

  private recalculateResult(result: TotalResult) {
    let resultsArray = Array.from(result.results.values());
    if (resultsArray.length == this.competitionIds.length && resultsArray.every(x => x.status === 0)) {
      result.total = resultsArray.reduce((previousValue, currentValue) => previousValue + parseInt(currentValue.result), 0);
    } else {
      result.total = 0;
    }
  }

  private createTotalResult(competitionId: string, result: Result): TotalResult {
    let totalResult = <TotalResult> {
      club: result.club,
      name: result.name,
      results: new Map([[competitionId, result]]),
    };
    return totalResult;
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
