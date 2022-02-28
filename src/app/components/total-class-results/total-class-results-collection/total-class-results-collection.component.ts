import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TotalResult } from '../total-result';

@Component({
  selector: 'lrt-total-class-results-collection',
  templateUrl: './total-class-results-collection.component.html',
  styleUrls: ['./total-class-results-collection.component.scss']
})
export class TotalClassResultsCollectionComponent {

  @Input() set results(results: TotalResult[]) {
    this.dataSource.data = results;
  }
  @Input() competitionIds: string[];
  @Input() displayedColumns: string[] = ['name', 'club', '19891', '19908','19915', 'total',];

  dataSource: MatTableDataSource<TotalResult> = new MatTableDataSource();
}
