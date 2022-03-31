import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClassResultsModule } from './class-results/class-results.module';
import { TotalClassResultsModule } from './total-class-results/total-class-results.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ClassResultsModule,
    TotalClassResultsModule,
  ],
})
export class ComponentsModule { }
