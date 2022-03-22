import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { TimeService } from 'src/app/shared/time.service';
import {
  Result,
} from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-class-results-collection',
  templateUrl: './class-results-collection.component.html',
  styleUrls: ['./class-results-collection.component.scss']
})
export class ClassResultsCollectionComponent implements OnInit {

  @Input() set results(results: Result[]) {
    this.dataSource.data = results;
  }
  @Input() displayedColumns: string[] = [
    'place',
    'name',
    'club',
    'start',
    'finish',
    'timePlus',
  ];

  dataSource: MatTableDataSource<Result> = new MatTableDataSource();
  time$: Observable<number>;

  constructor(
    private timeService: TimeService,
  ) {
  }

  ngOnInit(): void {
    this.time$ = this.timeService.getTimeObservable();
  }
}
