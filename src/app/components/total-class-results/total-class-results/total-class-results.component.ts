import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import {
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

  results: TotalResult[] = [];
  outResults$: Subject<TotalResult[]> = new Subject<TotalResult[]>();

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
    private compareService: ResultCompareService,
  ) {
  }

  ngOnInit(): void {
    this.competitionIds.forEach(competitionId => {
      this.service.getClassResults(competitionId, this.className, true)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(classResults => {
        classResults.results.forEach(result => {
          const existingResult = this.results.find(x => x.name == result.name && x.club == result.club)
          if(existingResult) {
            this.appendResult(existingResult, competitionId, result);
          } else {
            this.results.push(this.createTotalResult(competitionId, result))
          }
        });
        console.log(this.results);
        this.outResults$.next([...this.results.sort(this.compareService.compareTotalResults(this.competitionIds))]);
      })
    })
  }

  private appendResult(existingResult: TotalResult, competitionId: string, result: Result) {
    existingResult.results.set(competitionId, result);
    this.recalculateResult(existingResult);
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
    this.recalculateResult(totalResult);
    return totalResult;
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
