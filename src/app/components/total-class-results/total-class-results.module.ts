import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { SharedModule } from 'src/app/shared/shared.module';

import { TotalClassResultsComponent } from './total-class-results/total-class-results.component';
import { TotalClassResultsCollectionComponent } from './total-class-results-collection/total-class-results-collection.component';



@NgModule({
  declarations: [
    TotalClassResultsComponent,
    TotalClassResultsCollectionComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
  ],
  exports: [
    TotalClassResultsComponent,
  ],
})
export class TotalClassResultsModule { }
