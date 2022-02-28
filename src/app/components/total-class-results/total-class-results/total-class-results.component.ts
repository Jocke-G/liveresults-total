import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, map, tap, filter } from 'rxjs';

import {
  ClassResults,
} from 'src/app/services/liveresults/models';
import { LiveresultsService } from 'src/app/services/liveresults/services';
import { ResultCalcylateService } from 'src/app/shared/result-calcylator.service';
import { ResultCompareService } from 'src/app/shared/result-compare.service';
import { TotalResultConverterService } from 'src/app/shared/total-result-converter.service';
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
    private convertService: TotalResultConverterService,
    private calculateService: ResultCalcylateService,
  ) {
  }

  ngOnInit(): void {
    const classResultsList$: Observable<[string, ClassResults]>[] = this.competitionIds.map(competitionId =>
      this.service.getClassResults(competitionId, this.className, true)
      .pipe(
        filter(_ => !!_),
        map(result => [competitionId, result]),
      )
    );
    const classResults$: Observable<[string, ClassResults][]> = forkJoin(classResultsList$);

    this.outResults$ = classResults$.pipe(
      map((tuples: [string, ClassResults][]) => {
        const res = tuples.reduce((previousValue, currentValue) => this.convertService.merge(previousValue, currentValue), [] as TotalResult[])
        res.map(_ => this.calculateService.recalculateResult(_, this.competitionIds))
        return res.sort(this.compareService.compareTotalResults(this.competitionIds));
      }),
      tap(_ => console.log(_)),
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
