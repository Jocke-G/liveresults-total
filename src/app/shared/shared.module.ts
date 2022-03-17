import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ResultPipe } from './result.pipe';
import { StageResultPipe } from './stage-result.pipe';
import { TimePipe } from './time.pipe';
import { TimePlusPipe } from './time-plus.pipe';
import { ColumnSelectDragDropComponent } from './column-select-drag-drop/column-select-drag-drop.component';
import { SelectClassInfoAutocompleteComponent } from './class-info/select-class-info-autocomplete/select-class-info-autocomplete.component';
import { SelectCompetitionAutocompleteComponent } from './competition/select-competition-autocomplete/select-competition-autocomplete.component';


@NgModule({
  declarations: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
    TimePlusPipe,
    ColumnSelectDragDropComponent,
    SelectClassInfoAutocompleteComponent,
    SelectCompetitionAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
    TimePlusPipe,
    ColumnSelectDragDropComponent,
    DragDropModule,
    SelectClassInfoAutocompleteComponent,
    SelectCompetitionAutocompleteComponent,
  ]
})
export class SharedModule { }
