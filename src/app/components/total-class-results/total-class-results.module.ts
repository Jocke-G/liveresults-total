import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { SharedModule } from 'src/app/shared/shared.module';

import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { TotalClassResultsComponent } from './total-class-results/total-class-results.component';
import { TotalClassResultsCollectionComponent } from './total-class-results-collection/total-class-results-collection.component';
import { TotalClassResultsConfigComponent } from './total-class-results-config/total-class-results-config.component';



@NgModule({
  declarations: [
    TotalClassResultsComponent,
    TotalClassResultsCollectionComponent,
    TotalClassResultsConfigComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule,
    SharedMaterialModule,
  ],
  exports: [
    TotalClassResultsComponent,
    TotalClassResultsConfigComponent,
  ],
})
export class TotalClassResultsModule { }
