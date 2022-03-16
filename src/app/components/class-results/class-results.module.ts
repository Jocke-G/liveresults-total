import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClassResultsCollectionComponent } from './class-results-collection/class-results-collection.component';
import { ClassResultsComponent } from './class-results/class-results.component';



@NgModule({
  declarations: [
    ClassResultsComponent,
    ClassResultsCollectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  exports: [
    ClassResultsComponent,
  ],
})
export class ClassResultsModule { }
