import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompetitionInfo } from 'src/app/services/liveresults/models';

import { TotalResult } from '../total-result';

@Component({
  selector: 'lrt-total-class-results-collection',
  templateUrl: './total-class-results-collection.component.html',
  styleUrls: ['./total-class-results-collection.component.scss']
})
export class TotalClassResultsCollectionComponent implements OnChanges {

  @Input() set results(results: TotalResult[]) {
    this.dataSource.data = results;
  }
  @Input() competitions: CompetitionInfo[];
  @Input() displayedColumns: string[] = ['name', 'club'];
  @Input() stageColumns: string[] = ['json',];
  @Input() totalColumns: string[] = ['json',];

  displayedHeaderColumns: string[] = ['before-dummy', 'after-dummy'];
  dataSource: MatTableDataSource<TotalResult> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges) {
    const competitions: CompetitionInfo[] = changes['competitions'].currentValue as CompetitionInfo[];
    this.displayedHeaderColumns = ['before-dummy', ...competitions.map(competition => competition.id.toString()), 'after-dummy'];

    let competitionColumns: string[] = this.competitions
      .map(competition=> this.getColumnsForCompetition(competition.id.toString(), this.stageColumns))
      .reduce((accumulator, value) => accumulator.concat(value), []);

    this.displayedColumns = ['name', 'club', ...competitionColumns, ...this.totalColumns];
  }

  private getColumnsForCompetition(competitionId: string, columns: string[]): string[] {
    return columns
      .map(column => `${competitionId}_${column}`);
  }
}
