import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {
  Result,
} from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-class-results-collection',
  templateUrl: './class-results-collection.component.html',
  styleUrls: ['./class-results-collection.component.scss']
})
export class ClassResultsCollectionComponent {

  @Input() set results(results: Result[]) {
    this.dataSource.data = results;
  }
  @Input() displayedColumns: string[] = ['place', 'name', 'club', 'result', ];

  dataSource: MatTableDataSource<Result> = new MatTableDataSource();
}
