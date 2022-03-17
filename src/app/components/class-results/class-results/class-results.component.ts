import { Component, Input, OnDestroy } from '@angular/core';
import { first, interval, Subject, takeUntil, Observable, startWith, Subscription } from 'rxjs';

import {
  ClassResult,
} from 'src/app/services/liveresults/models';
import {
  LiveresultsService,
} from 'src/app/services/liveresults/services';

@Component({
  selector: 'lrt-class-results',
  templateUrl: './class-results.component.html',
  styleUrls: ['./class-results.component.scss']
})
export class ClassResultsComponent implements OnDestroy {

  @Input() competitionId: string;
  @Input() className: string;
  intervalSubscription: Subscription|undefined;
  @Input() set refreshRate(value: number|undefined) {
    if(this.intervalSubscription !== undefined) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
    this.startTimer(value);
  }
  @Input() columns: string[];

  classResults$: Subject<ClassResult> = new Subject();

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
  ) {
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }

  private refreshData(): void {
    this.getData()
      .pipe(
        first(),
      ).subscribe(classResult => {
        this.classResults$.next(classResult);
      })
  }

  private getData(): Observable<ClassResult> {
    return this.service.getClassResults(this.competitionId, this.className);
  }

  private startTimer(refreshRate: number|undefined): void {
    if (refreshRate !== undefined && refreshRate >= 1000) {
      this.intervalSubscription = interval(refreshRate).pipe(
        startWith(0),
        takeUntil(this._destroy$),
      ).subscribe(n => {
        this.refreshData();
      });
    }
  }
}
