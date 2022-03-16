import { first, interval, Subject, takeUntil, Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

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
export class ClassResultsComponent implements OnInit, OnDestroy {

  @Input() competitionId: string;
  @Input() className: string;
  @Input() refreshRate: number|undefined;
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

  ngOnInit(): void {
    this.refreshData();
    this.startTimer();
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
