import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lrt-class-results-page',
  templateUrl: './class-results-page.component.html',
  styleUrls: ['./class-results-page.component.scss']
})
export class ClassResultsPageComponent implements OnInit {

  competitionId: string;
  className: string;

  private _destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(params => {
        this.competitionId = params['competitionId'];
        this.className = params['className'];
      }
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
