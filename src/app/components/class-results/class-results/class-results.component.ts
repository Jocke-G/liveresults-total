import { Subject, takeUntil } from 'rxjs';
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

  classResults: ClassResult;

  private _destroy$ = new Subject();

  constructor(
    private service: LiveresultsService,
  ) {
  }

  ngOnInit(): void {
    this.service.getClassResults(this.competitionId, this.className)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(classResults => {
        this.classResults = classResults;
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
