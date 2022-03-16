import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { StartFacadeService } from './../start/start-facade.service';
import {
  ClassInfo,
  CompetitionInfo,
} from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-competition-class-form',
  templateUrl: './competition-class-form.component.html',
  styleUrls: ['./competition-class-form.component.scss']
})
export class CompetitionClassFormComponent implements OnInit {

  competitions$: Observable<CompetitionInfo[]>;
  selectedCompetition: CompetitionInfo;
  classes$: Observable<ClassInfo[]>;
  selectedClass: ClassInfo;

  constructor(
    private facade: StartFacadeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.competitions$ = this.facade.getCompetitions();
  }

  onSelectCompetiton(competition: CompetitionInfo): void {
    this.selectedCompetition = competition;
    this.classes$ = this.facade.getClasses(competition.id.toString());
    console.log("Competition selected: ", competition.name)
  }

  onSelectClass(classInfo: ClassInfo): void {
    this.selectedClass = classInfo;
  }

  onClick($event: MouseEvent) {
    $event.preventDefault();
    console.log($event);
    this.router.navigate(['classResults'], { queryParams: <Params> {
      competitionId: this.selectedCompetition.id,
      className: this.selectedClass.className,
    } });
  }
}
