import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, interval, startWith } from 'rxjs';

import { Result } from 'src/app/services/liveresults/models/result';

@Component({
  selector: 'lrt-class-results-collection',
  templateUrl: './class-results-collection.component.html',
  styleUrls: ['./class-results-collection.component.scss']
})
export class ClassResultsCollectionComponent implements OnInit {

  @Input() set results(results: Result[]) {
    this.dataSource.data = results;
  }
  @Input() displayedColumns: string[] = ['place', 'name', 'club', 'result',];

  dataSource: MatTableDataSource<Result> = new MatTableDataSource();
  time$: Observable<number>;

  ngOnInit(): void {
    this.time$ = interval(10)
      .pipe(
        startWith(0),
        map(_ => {
          const date = new Date();
          const hours =  date.getHours() * 60 * 60;
          const minutes =  date.getMinutes() * 60;
          const seconds =  date.getSeconds();
          return (hours + minutes + seconds) * 100;
        }),
      );
  }
}
