import { CompetitionClassModule } from './../competition-class-form/competition-class-form.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { StartComponent } from './start.component';



@NgModule({
  declarations: [
    StartComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    CompetitionClassModule,
  ],
  exports: [
    StartComponent,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class StartModule { }
