import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { CompetitionInfo } from 'src/app/services/liveresults/models';
import { TimeService } from 'src/app/shared/time.service';

import { TotalResult } from '../model';

@Component({
  selector: 'lrt-total-class-results-collection',
  templateUrl: './total-class-results-collection.component.html',
  styleUrls: ['./total-class-results-collection.component.scss']
})
export class TotalClassResultsCollectionComponent implements OnInit, OnChanges {

  @Input() competitions: CompetitionInfo[];
  @Input() set results(results: TotalResult[]) {
    this.dataSource.data = results;
  }
  @Input() stageColumns: string[] = [
    'place',
    'start',
    'finish',
    'timePlus',
    'total',
  ];
  @Input() totalColumns: string[] = [
  ];

  dataSource: MatTableDataSource<TotalResult> = new MatTableDataSource();
  displayedColumns: string[];
  displayedHeaderColumns: string[];
  time$: Observable<number>;

  constructor(
    private timeService: TimeService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newCompetitions = changes['competitions'];
    if(newCompetitions !== undefined) {
      this.calculateColumns();
    }
  }

  private calculateColumns() {
    this.displayedHeaderColumns = ['before-dummy', ...this.competitions.map(competition => competition.id.toString()), ...this.totalColumns.length > 0 ? ['after-dummy'] : []];

    let competitionColumns: string[] = this.competitions
      .map(competition => this.getColumnsForCompetition(competition.id.toString(), this.stageColumns))
      .reduce((accumulator, value) => accumulator.concat(value), []);

    this.displayedColumns = ['name', 'club', ...competitionColumns, ...this.totalColumns];
  }

  ngOnInit(): void {
    this.time$ = this.timeService.getTimeObservable();
  }

  private getColumnsForCompetition(competitionId: string, columns: string[]): string[] {
    return columns
      .map(column => `${competitionId}_${column}`);
  }
}
