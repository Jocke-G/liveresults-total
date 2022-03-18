import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ColumnSelectDragDropComponent } from './column-select-drag-drop/column-select-drag-drop.component';
import { SelectClassInfoAutocompleteComponent } from './class-info/select-class-info-autocomplete/select-class-info-autocomplete.component';
import { SelectCompetitionAutocompleteComponent } from './competition/select-competition-autocomplete/select-competition-autocomplete.component';
import { TextFormattingModule } from './text-formatting/text-formatting.module';


@NgModule({
  declarations: [
    ColumnSelectDragDropComponent,
    SelectClassInfoAutocompleteComponent,
    SelectCompetitionAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    TextFormattingModule,
  ],
  exports: [
    ColumnSelectDragDropComponent,
    SelectClassInfoAutocompleteComponent,
    SelectCompetitionAutocompleteComponent,
    TextFormattingModule,
  ],
})
export class SharedModule { }
