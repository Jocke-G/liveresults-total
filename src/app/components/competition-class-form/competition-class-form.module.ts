import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { CompetitionClassFormComponent } from './competition-class-form.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { SelectCompetitionAutocompleteComponent } from 'src/app/shared/competition/select-competition-autocomplete/select-competition-autocomplete.component';
import { SelectClassInfoAutocompleteComponent } from 'src/app/shared/class-info/select-class-info-autocomplete/select-class-info-autocomplete.component';



@NgModule({
  declarations: [
    CompetitionClassFormComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports: [
    CompetitionClassFormComponent,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CompetitionClassModule { }
