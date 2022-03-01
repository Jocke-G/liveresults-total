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
  refreshRate: number|undefined;
  stageColumns: string[];
  totalColumns: string[];

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

        const competitionIds = params['competitionIds']?.split(',').filter((_: string) => !!_);
        this.competitionIds = competitionIds;

        const refreshRate = Number(params['refreshRate']);
        this.refreshRate = isNaN(refreshRate)?undefined:refreshRate;

        const stageColumns = params['stageColumns']?.split(',').filter((_: string) => !!_);
        this.stageColumns = stageColumns?stageColumns:[];

        const totalColumns = params['totalColumns']?.split(',').filter((_: string) => !!_);
        this.totalColumns = totalColumns?totalColumns:[];
      }
    );
  }
}
