import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

import { ClassResultsModule } from './class-results/class-results.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ClassResultsModule,
  ]
})
export class ComponentsModule { }
