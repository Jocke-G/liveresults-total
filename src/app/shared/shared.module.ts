import { SelectClassInfoAutocompleteComponent } from './class-info/select-class-info-autocomplete/select-class-info-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultPipe } from './result.pipe';
import { StageResultPipe } from './stage-result.pipe';
import { TimePipe } from './time.pipe';
import { TimePlusPipe } from './time-plus.pipe';
import { SelectCompetitionAutocompleteComponent } from './competition/select-competition-autocomplete/select-competition-autocomplete.component';
import { SharedMaterialModule } from './shared-material/shared-material.module';



@NgModule({
  declarations: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
    TimePlusPipe,
    SelectCompetitionAutocompleteComponent,
    SelectClassInfoAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
    TimePlusPipe,
    SelectCompetitionAutocompleteComponent,
    SelectClassInfoAutocompleteComponent,
  ],
})
export class SharedModule { }
