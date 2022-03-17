import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lrt-column-select-drag-drop',
  templateUrl: './column-select-drag-drop.component.html',
  styleUrls: ['./column-select-drag-drop.component.scss']
})
export class ColumnSelectDragDropComponent {

  @Input() availableColumns: string[];
  @Input('selectedColumns') set setSelectedColumns(value: string[]) {
    this.selectedColumns = value;
    this.notSelectedColumns = this.availableColumns.filter(_ => !this.selectedColumns.includes(_))
  }
  selectedColumns: string[];
  @Output() selectedColumnsChange = new EventEmitter<string[]>();
  notSelectedColumns: string[];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.selectedColumnsChange.emit(this.selectedColumns)
  }
}
