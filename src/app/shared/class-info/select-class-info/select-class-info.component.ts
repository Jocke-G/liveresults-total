import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ClassInfo } from 'src/app/services/liveresults/models';

@Component({
  selector: 'lrt-select-class-info',
  templateUrl: './select-class-info.component.html',
  styleUrls: ['./select-class-info.component.scss']
})
export class SelectClassInfoComponent implements OnInit {

  @Input() classes: ClassInfo[];
  @Input() value: string;
  @Output() select: EventEmitter<ClassInfo> = new EventEmitter();

  formControl = new FormControl();
  selectedClass: ClassInfo|undefined;

  ngOnChanges(changes: SimpleChanges): void {
    const newClasses = changes['classes'];
    if(newClasses !== undefined && newClasses.currentValue !== undefined) {
      this.setSelectedClass()
    }
  }

  ngOnInit(): void {
    this.setSelectedClass();
  }

  private setSelectedClass() {
    this.selectedClass = this.classes.find(classInfo => classInfo.className === this.value);
  }

  onValueChange($event: ClassInfo): void {
    console.log($event);
    this.select.emit($event);
  }

  displayFn(classInfo: ClassInfo|string): string {
    if(typeof classInfo === 'string') {
      return classInfo;
    }
    return classInfo ? `${classInfo.className}` : '';
  }
}
