import { CompetitionClassModule } from './competition-class-form/competition-class-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassResultsModule } from './class-results/class-results.module';
import { StartModule } from './start/start.module';
import { TotalClassResultsModule } from './total-class-results/total-class-results.module';
import { CompetitionClassFormComponent } from './competition-class-form/competition-class-form.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CompetitionClassModule,
  ],
  exports: [
    ClassResultsModule,
    StartModule,
    TotalClassResultsModule,
  ],
})
export class ComponentsModule { }
