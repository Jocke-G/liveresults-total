import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, map, tap, filter } from 'rxjs';

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
  @Input() stageColumns: string[];
  @Input() totalColumns: string[];

  displayedColumns: string[];
  competitions$: Observable<CompetitionInfo[]>;
  results$: Observable<TotalResult[]>;

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
    private compareService: ResultCompareService,
    private convertService: TotalResultConverterService,
    private calculateService: ResultCalcylateService,
  ) {
  }

  ngOnInit(): void {
    this.competitions$ = this.getCompetitionInfo(this.competitionIds);

    const classResultsList$: Observable<[string, ClassResult]>[] = this.competitionIds.map(competitionId =>
      this.service.getClassResults(competitionId, this.className, true)
      .pipe(
        filter(_ => !!_),
        map(result => [competitionId, result]),
      )
    );
    const classResults$: Observable<[string, ClassResult][]> = forkJoin(classResultsList$);

    this.results$ = classResults$.pipe(
      map((tuples: [string, ClassResult][]) => {
        const res = tuples.reduce((totalResults, classResult) => this.convertService.merge(totalResults, classResult), [] as TotalResult[])
        res.map(totalResult => this.calculateService.recalculateResult(totalResult, this.competitionIds))
        return res.sort(this.compareService.compareTotalResults(this.competitionIds));
      }),
    );
  }

  private getCompetitionInfo(competitionIds: string[]): Observable<CompetitionInfo[]> {
    return forkJoin(
      competitionIds.map(competitionId =>
        this.service.getCompetitionInfo(competitionId)
      )
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
