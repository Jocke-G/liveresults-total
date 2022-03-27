import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, map, EMPTY } from 'rxjs';

import { ClassInfo, CompetitionInfo } from 'src/app/services/liveresults/models';

import { TotalClassResultsFacadeService } from './../total-class-results-facade.service';

@Component({
  selector: 'lrt-total-class-results-config',
  templateUrl: './total-class-results-config.component.html',
  styleUrls: ['./total-class-results-config.component.scss']
})
export class TotalClassResultsConfigComponent implements OnInit {

  availableStageColumns: string[] = [
    'place',
    'start',
    'finish',
    'timePlus',
    'json',
  ];
  @Input() className: string;
  @Output() changeClassName: EventEmitter<string> = new EventEmitter();
  @Input() competitionIds: string[];
  @Output() changeCompetitionIds: EventEmitter<string[]> = new EventEmitter();
  @Input() refreshRate: number|undefined;
  @Output() changeRefreshRate: EventEmitter<number> = new EventEmitter();
  @Input() stageColumns: string[];
  @Output() changeStageColumns: EventEmitter<string[]> = new EventEmitter();

  classes$: Observable<ClassInfo[]>;
  competitions$: Observable<CompetitionInfo[]>;
  value$: Observable<CompetitionInfo[]>;
  selectedClass$: Observable<ClassInfo | undefined>;

  constructor(
    private facade: TotalClassResultsFacadeService,
  ) {
  }

  ngOnInit(): void {
    this.competitions$ = this.facade.getCompetitions();
    this.value$ = this.competitions$.pipe(map(competitions => competitions.filter(competition => this.competitionIds.some(competitionId => competition.id.toString() === competitionId))));
    this.showClasses(this.competitionIds);
  }

  onSelect(competitions: CompetitionInfo[]) {
    this.showClasses(competitions.map(competition => competition.id.toString()));
    this.changeCompetitionIds.emit(competitions.map(competition => competition.id.toString()));
  }

  onSelectClass(classInfo: ClassInfo) {
    this.changeClassName.emit(classInfo.className);
  }

  onChangeRefreshRate($event: Event) {
    const input: HTMLInputElement = $event.target as HTMLInputElement;
    this.changeRefreshRate.emit(input.valueAsNumber);
  }

  onChangeStageColumns($event: string[]): void {
    this.changeStageColumns.emit($event);
  }

  private showClasses(competitionIds: string[]) {
    if (competitionIds.length === 0) {
      this.classes$ = EMPTY;
    } else {
      this.classes$ = this.facade.getClasses(competitionIds[0]);
      this.selectedClass$ = this.classes$.pipe(map(classes => classes.find(classInfo => classInfo.className === this.className)));
    }
  }
}
