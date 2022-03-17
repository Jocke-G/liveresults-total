import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

import { CompetitionInfo } from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-select-competition-autocomplete',
  templateUrl: './select-competition-autocomplete.component.html',
  styleUrls: ['./select-competition-autocomplete.component.scss']
})
export class SelectCompetitionAutocompleteComponent implements OnInit {

  @Input() competitions: CompetitionInfo[];
  @Output() select: EventEmitter<CompetitionInfo> = new EventEmitter();

  formControl = new FormControl();
  filteredCompetitions$: Observable<CompetitionInfo[]>;

  ngOnInit(): void {
    this.filteredCompetitions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this.filter(name) : this.competitions.slice())),
      map(competitions => competitions.slice(0, 100)), // Performance hack
    );
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent): void {
    this.select.emit($event.option.value);
  }

  displayFn(competition: CompetitionInfo): string {
    return competition ? `${competition.date} ${competition.name}` : '';
  }

  private filter(value: string): CompetitionInfo[] {
    const filterValues: string[] = value.toLowerCase().split(' ');

    return this.competitions.filter(competition => {
      return filterValues.every(x => competition.name.toLowerCase().includes(x) || competition.date.includes(x));
    });
  }
}
