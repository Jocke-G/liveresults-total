import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { first, interval, Subject, takeUntil, Observable, startWith, Subscription, withLatestFrom, of, mergeMap } from 'rxjs';

import { LiveresultsService } from 'src/app/services/liveresults/services';
import { ResultCompareService } from 'src/app/shared/result-compare.service';
import {
  ClassResult,
} from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-class-results',
  templateUrl: './class-results.component.html',
  styleUrls: ['./class-results.component.scss']
})
export class ClassResultsComponent implements OnInit, OnDestroy {

  @Input() competitionId: string;
  @Input() className: string;
  @Input() set refreshRate(value: number|undefined) {
    this.startInterval(value);
  }
  @Input() columns: string[];

  classResults$: Observable<ClassResult> = new Subject();

  private destroy$ = new Subject();
  private intervalSubscription: Subscription|undefined;
  private rawClassResults$: Subject<ClassResult> = new Subject();

  constructor(
    private service: LiveresultsService,
    private compareService: ResultCompareService,
  ) {
  }

  ngOnInit(): void {
    this.classResults$ = interval(100).pipe(
      startWith(0),
      withLatestFrom(this.rawClassResults$),
      mergeMap(([_, classResult]) => { return of(this.sort(classResult))}),
      )
  }

  private sort(classResult: ClassResult): ClassResult {
    return {
      ...classResult,
      results: classResult.results.sort(this.compareService.compareResults),
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private refreshData(): void {
    this.getData()
      .pipe(
        first(),
      ).subscribe(classResult => {
        this.rawClassResults$.next(classResult);
      })
  }

  private getData(): Observable<ClassResult> {
    return this.service.getClassResults(this.competitionId, this.className, true);
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
