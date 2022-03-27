import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

import { CompetitionInfo } from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-select-competition-autocomplete-multi',
  templateUrl: './select-competition-autocomplete-multi.component.html',
  styleUrls: ['./select-competition-autocomplete-multi.component.scss']
})
export class SelectCompetitionAutocompleteMultiComponent implements OnInit {

  @Input() competitions: CompetitionInfo[];
  @Input() value: CompetitionInfo[];
  @Output() select: EventEmitter<CompetitionInfo[]> = new EventEmitter();

  @ViewChild('competitionInput') competitionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  selectedCompetitions: CompetitionInfo[] = [];
  formControl = new FormControl(null, [Validators.minLength(10)]);
  filteredCompetitions$: Observable<CompetitionInfo[]>;

  ngOnChanges(changes: SimpleChanges): void {
    const newCompetitions = changes['value'];
    if(newCompetitions !== undefined) {
      this.selectedCompetitions = this.value;
    }
  }

  ngOnInit(): void {
    this.filteredCompetitions$ = this.getFilteredCompetitions();
    this.selectedCompetitions = this.value;
  }

  private getFilteredCompetitions(): Observable<CompetitionInfo[]> {
    return this.formControl.valueChanges.pipe(
      startWith(this.competitionInput?.nativeElement?.value || ''),
      map(value => ((typeof value === 'string' && value !== null) ? value : value.name)),
      map(name => (name ? this.filter(name) : this.competitions.slice())),
      map(competitions => competitions.filter(competition => !this.selectedCompetitions.includes(competition))),
      map(competitions => competitions.slice(0, 100)),
    );
  }

  displayFn(competition: CompetitionInfo): string {
    return competition ? `${competition.date} ${competition.name}` : '';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedCompetitions, event.previousIndex, event.currentIndex);
    this.select.emit(this.selectedCompetitions);
  }

  remove(competition: CompetitionInfo): void {
    const index = this.selectedCompetitions.indexOf(competition);

    if (index >= 0) {
      this.selectedCompetitions.splice(index, 1);
    }
    this.select.emit(this.selectedCompetitions);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCompetitions.push(event.option.value);
    this.filteredCompetitions$ = this.getFilteredCompetitions();
    this.select.emit(this.selectedCompetitions);
  }

  private filter(value: string): CompetitionInfo[] {
    const filterValues: string[] = value.toLowerCase().split(' ');

    return this.competitions.filter(competition => {
      return filterValues.every(x => competition.name.toLowerCase().includes(x) || competition.date.includes(x));
    });
  }
}
