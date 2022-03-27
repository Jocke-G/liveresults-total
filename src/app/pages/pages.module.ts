import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';

import { ComponentsModule } from '../components/components.module';

import { ClassResultsPageComponent } from './class-results-page/class-results-page.component';
import { TotalClassResultsPageComponent } from './total-class-results-page/total-class-results-page.component';



@NgModule({
  declarations: [
    ClassResultsPageComponent,
    TotalClassResultsPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedMaterialModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
})
export class PagesModule { }
