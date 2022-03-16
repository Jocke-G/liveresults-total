import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lrt-class-results-page',
  templateUrl: './class-results-page.component.html',
  styleUrls: ['./class-results-page.component.scss']
})
export class ClassResultsPageComponent implements OnInit, OnDestroy {

  className: string;
  competitionId: string;
  refreshRate: number|undefined;
  columns: string[];

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
        this.competitionId = params['competitionId'];

        const refreshRate = Number(params['refreshRate']);
        this.refreshRate = isNaN(refreshRate)?undefined:refreshRate;

        const columns = params['columns']?.split(',').filter((_: string) => !!_);
        this.columns = columns?columns:[];
      }
    );
  }
}
