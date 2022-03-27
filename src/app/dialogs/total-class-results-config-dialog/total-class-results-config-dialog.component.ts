import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TotalClassResultsConfigDialogData } from './total-class-results-config-dialog-data';

@Component({
  selector: 'lrt-total-class-results-config-dialog',
  templateUrl: './total-class-results-config-dialog.component.html',
  styleUrls: ['./total-class-results-config-dialog.component.scss']
})
export class TotalClassResultsConfigDialogComponent {

  @Output() changeCompetitionIds: EventEmitter<string[]> = new EventEmitter();
  @Output() changeClassName: EventEmitter<string> = new EventEmitter();
  @Output() changeRefreshRate: EventEmitter<number> = new EventEmitter();
  @Output() changeStageColumns: EventEmitter<string[]> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<TotalClassResultsConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TotalClassResultsConfigDialogData,
  ) {
  }

  onChangeCompetitionIds(competitionIds: string[]): void {
    this.changeCompetitionIds.emit(competitionIds);
  }

  onChangeClassName(className: string): void {
    this.changeClassName.emit(className);
  }

  onChangeRefreshRate(refreshRate: number): void {
    this.changeRefreshRate.emit(refreshRate);
  }

  onChangeStageColumns(stageColumns: string[]): void {
    this.changeStageColumns.emit(stageColumns);
  }
}
