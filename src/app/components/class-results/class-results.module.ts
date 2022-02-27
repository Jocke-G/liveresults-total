import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ClassResultsCollectionComponent } from './class-results-collection/class-results-collection.component';
import { ClassResultsComponent } from './class-results/class-results.component';



@NgModule({
  declarations: [
    ClassResultsComponent,
    ClassResultsCollectionComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  exports: [
    ClassResultsComponent,
  ],
})
export class ClassResultsModule { }
