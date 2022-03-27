import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ClassResultsConfigComponent } from 'src/app/components/class-results/class-results-config/class-results-config.component';

@Component({
  selector: 'lrt-class-results-page',
  templateUrl: './class-results-page.component.html',
  styleUrls: ['./class-results-page.component.scss'],
})
export class ClassResultsPageComponent implements OnInit, OnDestroy {

  hideConfigDialog: boolean = false;
  dialogRef: MatDialogRef<ClassResultsConfigComponent>;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: any) {
    if(event.key === 'c') {
      if(event.target.nodeName === "INPUT") {
        return;
      }
      if(this.hideConfigDialog) {
        this.openConfigDialog();
      } else {
        this.closeConfigDialog();
      }
    }
  }

  className: string;
  competitionId: string;
  refreshRate: number|undefined;
  columns: string[];

  private _destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  private openConfigDialog() {
    this.setHideConfigDialog(false);
    const ref = this.dialog.open(ClassResultsConfigComponent);
    ref.componentInstance.columns = this.columns;
    ref.componentInstance.refreshRate = this.refreshRate;
    ref.componentInstance.competition = parseInt(this.competitionId);
    ref.componentInstance.selectCompetition.subscribe(_ => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { competitionId: _.id }
      });
    })
    ref.componentInstance.selectClass.subscribe(_ => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { className: _.className }
      });
    })
    ref.componentInstance.setRefreshRate.subscribe(_ => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { refreshRate: _ }
      });
    })

    ref.afterClosed().subscribe(result => {
      this.setHideConfigDialog(true);
    });

    this.dialogRef = ref;
  }

  private setHideConfigDialog(hide: boolean) {
    if(this.hideConfigDialog !== hide) {
      this.hideConfigDialog = hide;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { hideConfigDialog: this.hideConfigDialog?'true':'false' }
      });
      }
  }

  private closeConfigDialog() {
    this.dialogRef.close();
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

        const strHideConfigDialog = params['hideConfigDialog'];
        this.hideConfigDialog = strHideConfigDialog === 'true';

        if(!this.hideConfigDialog) {
          if(!this.dialogRef || this.dialogRef.getState() !== MatDialogState.OPEN) {
            this.openConfigDialog();
          }
        }
      }
    );
  }
}
