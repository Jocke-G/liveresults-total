import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lrt-total-class-results-page',
  templateUrl: './total-class-results-page.component.html',
  styleUrls: ['./total-class-results-page.component.scss']
})
export class TotalClassResultsPageComponent implements OnInit, OnDestroy {

  className: string;
  competitionIds: string[];

  private _destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(params => {
        this.className = params['className'];
        this.competitionIds = params['competitionIds']?.split(',');
      }
    );
  }
}
