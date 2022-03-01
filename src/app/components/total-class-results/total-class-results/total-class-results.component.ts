import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, map, filter, interval, takeUntil, first } from 'rxjs';

import {
  ClassResult,
  CompetitionInfo,
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
  @Input() refreshRate: number|undefined;
  @Input() stageColumns: string[];
  @Input() totalColumns: string[];

  competitions$: Subject<CompetitionInfo[]> = new Subject<CompetitionInfo[]>();
  results$: Subject<TotalResult[]> = new Subject<TotalResult[]>();

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
    private compareService: ResultCompareService,
    private convertService: TotalResultConverterService,
    private calculateService: ResultCalcylateService,
  ) {
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.refreshData();
    this.startTimer();
  }

  private refreshData(): void {
    this.getResultData()
      .pipe(
        first(),
      ).subscribe(classResult => {
        this.results$.next(classResult);
      })

    this.getCompetitionInfo(this.competitionIds)
      .pipe(
        first(),
      ).subscribe(competitions => {
        this.competitions$.next(competitions);
      })
  }

  private getResultData(): Observable<TotalResult[]> {
    const classResultsList$: Observable<[string, ClassResult]>[] = this.competitionIds.map(competitionId => this.service.getClassResults(competitionId, this.className, true)
      .pipe(
        filter(_ => !!_),
        map(result => [competitionId, result])
      )
    );
    const classResults$: Observable<[string, ClassResult][]> = forkJoin(classResultsList$);

    return classResults$.pipe(
      map((tuples: [string, ClassResult][]) => {
        const res = tuples.reduce((totalResults, classResult) => this.convertService.merge(totalResults, classResult), [] as TotalResult[]);
        res.map(totalResult => this.calculateService.recalculateResult(totalResult, this.competitionIds));
        return res.sort(this.compareService.compareTotalResults(this.competitionIds));
      })
    );
  }

  private getCompetitionInfo(competitionIds: string[]): Observable<CompetitionInfo[]> {
    return forkJoin(
      competitionIds.map(competitionId =>
        this.service.getCompetitionInfo(competitionId)
      )
    );
  }

  private startTimer(): void {
    if (this.refreshRate !== undefined) {
      interval(this.refreshRate).pipe(
        takeUntil(this._destroy$),
      ).subscribe(n => {
        this.refreshData();
      });
    }
  }
}
