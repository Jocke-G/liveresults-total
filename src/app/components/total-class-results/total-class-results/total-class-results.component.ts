import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, forkJoin, map, filter, interval, takeUntil, first, startWith, withLatestFrom, mergeMap, of, Subscription, zip } from 'rxjs';

import {
  ClassInfo,
  ClassResult,
  CompetitionInfo,
} from 'src/app/services/liveresults/models';
import { LiveresultsService } from 'src/app/services/liveresults/services';
import { ResultCalcylateService } from 'src/app/shared/result-calcylator.service';
import { ResultCompareService } from 'src/app/shared/result-compare.service';
import { TotalResultConverterService } from 'src/app/shared/total-result-converter.service';
import {
  TotalResult,
} from '../model';
import { TotalClassResultsFacadeService } from '../total-class-results-facade.service';
import { TimeService } from 'src/app/shared/time.service';

@Component({
  selector: 'lrt-total-class-results',
  templateUrl: './total-class-results.component.html',
  styleUrls: ['./total-class-results.component.scss'],
})
export class TotalClassResultsComponent implements OnInit, OnDestroy {

  @Input('className') set setClassName(value: string) {
    this.className = value;
    this.refreshData();
  }
  className: string;
  @Input('competitionIds') set setCompetitionIds(value: string[]) {
    this.competitionIds = value;
    this.getCompetitionInfo();
    if(value.length > 0) {
      this.classes$ = this.facadeService.getClasses(value[0]);
    }
  }
  competitionIds: string[];
  @Input() set refreshRate(value: number|undefined) {
    this.startInterval(value);
  }
  @Input() stageColumns: string[];
  @Input() totalColumns: string[];
  @Output() selectClass: EventEmitter<ClassInfo> = new EventEmitter();
  @Output() toggleSettings: EventEmitter<void> = new EventEmitter();

  competitions$: Observable<CompetitionInfo[]>;
  results$: Observable<TotalResult[]> = new Observable<TotalResult[]>();
  classes$: Observable<ClassInfo[]>;

  private rawResults$: Subject<TotalResult[]> = new Subject<TotalResult[]>();
  private intervalSubscription: Subscription|undefined;
  private destroy$ = new Subject();

  constructor(
    private facadeService: TotalClassResultsFacadeService,
    private service: LiveresultsService,
    private compareService: ResultCompareService,
    private convertService: TotalResultConverterService,
    private calculateService: ResultCalcylateService,
    private timeService: TimeService,
  ) {
  }

  onSelectClass($event: ClassInfo) {
    this.selectClass.emit($event);
  }

  onToggleSettings() {
    this.toggleSettings.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getCompetitionInfo();

    this.results$ = this.timeService.getTimeObservable().pipe(
      withLatestFrom(this.rawResults$),
      mergeMap(([_, result]) => { return of(this.sort(this.recalculate(result)))}),
    )
  }

  private getCompetitionInfo() {
    this.competitions$ = zip(
      this.competitionIds.map(competitionId => this.facadeService.getCompetitionInfo(competitionId)
      ));
  }

  private refreshData(): void {
    this.getResultData()
      .pipe(
        first(),
      ).subscribe(classResult => {
        this.rawResults$.next(classResult);
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
        return tuples.reduce((totalResults, classResult) => this.convertService.merge(totalResults, classResult), [] as TotalResult[]);
      })
    );
  }

  private recalculate(totalResults: TotalResult[]): TotalResult[] {
    totalResults.map(totalResult => this.calculateService.recalculateResult(totalResult, this.competitionIds));
    this.calculateService.recalcylateRelativeResults(totalResults, this.competitionIds);
    return totalResults;
  }

  private sort(totalResults: TotalResult[]): TotalResult[] {
    return totalResults.sort(this.compareService.compareTotalResults(this.competitionIds));
  }

  private startInterval(refreshRate: number|undefined): void {
    if(this.intervalSubscription !== undefined) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }

    if (refreshRate !== undefined && refreshRate >= 1000) {
      this.intervalSubscription = interval(refreshRate).pipe(
        startWith(0),
        takeUntil(this.destroy$),
      ).subscribe(n => {
        this.refreshData();
      });
    } else {
      this.refreshData();
    }
  }
}
