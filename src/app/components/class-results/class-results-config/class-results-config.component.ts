import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ClassInfo, CompetitionInfo } from 'src/app/services/liveresults/models';
import { ClassResultsConfigFacadeService } from './class-results-config.facade';

@Component({
  selector: 'lrt-class-results-config',
  templateUrl: './class-results-config.component.html',
  styleUrls: ['./class-results-config.component.scss']
})
export class ClassResultsConfigComponent implements OnInit {

  availableColumns: string[] = [
    'place',
    'name',
    'club',
    'start',
    'finish',
    'timePlus',
    'json',
  ];
  @Input() columns: string[];
  @Input() refreshRate: number|undefined;

  @Output() setRefreshRate: EventEmitter<number> = new EventEmitter();
  @Output() selectCompetition: EventEmitter<CompetitionInfo> = new EventEmitter();
  @Output() selectClass: EventEmitter<ClassInfo> = new EventEmitter();

  competitions$: Observable<CompetitionInfo[]>;
  selectedCompetition: CompetitionInfo;
  classes$: Observable<ClassInfo[]>;
  selectedClass: ClassInfo;

  constructor(
    private facade: ClassResultsConfigFacadeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.competitions$ = this.facade.getCompetitions();
  }

  onChangeColumns($event: string[]): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: { columns: $event.join(',') }
    });
  }

  onSelectCompetiton(competition: CompetitionInfo): void {
    this.selectCompetition.emit(competition);
    this.selectedCompetition = competition;
    this.classes$ = this.facade.getClasses(competition.id.toString());
  }

  onSelectClass(classInfo: ClassInfo): void {
    this.selectedClass = classInfo;
    this.selectClass.emit(classInfo);
  }

  onChangeRefreshRate($event: Event) {
    const input: HTMLInputElement = $event.target as HTMLInputElement;
    this.setRefreshRate.emit(input.valueAsNumber);
  }
}
