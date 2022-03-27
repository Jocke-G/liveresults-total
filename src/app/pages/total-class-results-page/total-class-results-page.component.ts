import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { TotalClassResultsConfigDialogComponent } from 'src/app/dialogs/total-class-results-config-dialog/total-class-results-config-dialog.component';
import { TotalClassResultsConfigDialogData } from 'src/app/dialogs/total-class-results-config-dialog/total-class-results-config-dialog-data';

@Component({
  selector: 'lrt-total-class-results-page',
  templateUrl: './total-class-results-page.component.html',
  styleUrls: ['./total-class-results-page.component.scss'],
})
export class TotalClassResultsPageComponent implements OnInit, OnDestroy {

  hideConfigDialog: boolean = false;
  dialogRef: MatDialogRef<TotalClassResultsConfigDialogComponent>;
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: any) {
    if(event.key === 'c') {
      if(event.target.nodeName === "INPUT") {
        return;
      }
      this.toggleConfigDialog();
    }
  }

  className: string;
  competitionIds: string[];
  refreshRate: number|undefined;
  stageColumns: string[];
  totalColumns: string[];

  private _destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  private toggleConfigDialog() {
    if (this.hideConfigDialog) {
      this.openConfigDialog();
    } else {
      this.closeConfigDialog();
    }
  }

  private openConfigDialog() {
    this.setHideConfigDialog(false);
    this.dialogRef = this.dialog.open(TotalClassResultsConfigDialogComponent,{
      data: {
        className: this.className,
        competitionIds: this.competitionIds,
        refreshRate: this.refreshRate,
        stageColumns: this.stageColumns,
      } as TotalClassResultsConfigDialogData
    });

    let dialogComponent = this.dialogRef.componentInstance;
    dialogComponent.changeCompetitionIds.subscribe(competitionIds => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { competitionIds: competitionIds.join(','), }
      });
    });

    dialogComponent.changeClassName.subscribe(className => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { className: className, }
      });
    });

    dialogComponent.changeRefreshRate.subscribe(refreshRate => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { refreshRate: refreshRate, }
      });
    });

    dialogComponent.changeStageColumns.subscribe(stageColumns => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: { stageColumns: stageColumns.join(","), }
      });
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.setHideConfigDialog(true);
    });
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

        const competitionIds = params['competitionIds']?.split(',').filter((_: string) => !!_);
        this.competitionIds = competitionIds?competitionIds:[];

        const refreshRate = Number(params['refreshRate']);
        this.refreshRate = isNaN(refreshRate)?undefined:refreshRate;

        const stageColumns = params['stageColumns']?.split(',').filter((_: string) => !!_);
        this.stageColumns = stageColumns?stageColumns:['place','start','finish','timePlus','total'];

        const totalColumns = params['totalColumns']?.split(',').filter((_: string) => !!_);
        this.totalColumns = totalColumns?totalColumns:[];
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

  onClickSettings() {
    this.toggleConfigDialog();
  }
}
