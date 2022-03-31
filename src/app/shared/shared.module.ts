import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ColumnSelectDragDropComponent } from './column-select-drag-drop/column-select-drag-drop.component';
import { SelectClassInfoAutocompleteComponent } from './class-info/select-class-info-autocomplete/select-class-info-autocomplete.component';
import { SelectClassInfoComponent } from './class-info/select-class-info/select-class-info.component';
import { SelectCompetitionAutocompleteComponent } from './competition/select-competition-autocomplete/select-competition-autocomplete.component';
import { SelectCompetitionAutocompleteMultiComponent } from './competition/select-competition-autocomplete-multi/select-competition-autocomplete-multi.component';
import { TextFormattingModule } from './text-formatting/text-formatting.module';
import { SettingsButtonComponent } from './settings-button/settings-button.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    ColumnSelectDragDropComponent,
    FooterComponent,
    SelectClassInfoAutocompleteComponent,
    SelectClassInfoComponent,
    SelectCompetitionAutocompleteComponent,
    SelectCompetitionAutocompleteMultiComponent,
    SettingsButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    TextFormattingModule,
  ],
  exports: [
    ColumnSelectDragDropComponent,
    FooterComponent,
    SelectClassInfoAutocompleteComponent,
    SelectClassInfoComponent,
    SelectCompetitionAutocompleteComponent,
    SelectCompetitionAutocompleteMultiComponent,
    SettingsButtonComponent,
    TextFormattingModule,
  ],
})
export class SharedModule { }
