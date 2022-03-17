
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ClassResultsCollectionComponent } from './class-results-collection/class-results-collection.component';
import { ClassResultsComponent } from './class-results/class-results.component';
import { ClassResultsConfigComponent } from './class-results-config/class-results-config.component';



@NgModule({
  declarations: [
    ClassResultsComponent,
    ClassResultsCollectionComponent,
    ClassResultsConfigComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedMaterialModule,
  ],
  exports: [
    ClassResultsComponent,
  ],
})
export class ClassResultsModule { }
