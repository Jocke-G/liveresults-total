import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

import { ClassInfo } from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-select-class-info-autocomplete',
  templateUrl: './select-class-info-autocomplete.component.html',
  styleUrls: ['./select-class-info-autocomplete.component.scss']
})
export class SelectClassInfoAutocompleteComponent implements OnInit {

  @Input() classes: ClassInfo[];
  @Input() value: ClassInfo|undefined;
  @Output() select: EventEmitter<string> = new EventEmitter();

  formControl = new FormControl();
  filteredClasses$: Observable<ClassInfo[]>;

  ngOnChanges(changes: SimpleChanges): void {
    const newClassInfo = changes['value'];
    if(newClassInfo !== undefined && newClassInfo.currentValue !== undefined) {
      this.formControl.setValue(newClassInfo.currentValue)
    }
  }

  ngOnInit(): void {
    this.filteredClasses$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.className)),
      map(name => (name ? this.filter(name) : this.classes.slice())),
      map(classes => classes.slice(0, 100)), // Performance hack
    );
  }

  onOptionSelected($event: MatAutocompleteSelectedEvent): void {
    const classInfo: ClassInfo = $event.option.value;
    this.select.emit(classInfo.className);
  }

  displayFn(classInfo: ClassInfo|string): string {
    if(typeof classInfo === 'string') {
      return classInfo;
    }
    return classInfo ? `${classInfo.className}` : '';
  }

  on($event: any) {
    this.select.emit($event.target.value);
  }

  private filter(value: string): ClassInfo[] {
    const filterValues: string[] = value.toLowerCase().split(' ');

    return this.classes.filter(competition => {
      return filterValues.every(x => competition.className.toLowerCase().includes(x));
    });
  }
}
