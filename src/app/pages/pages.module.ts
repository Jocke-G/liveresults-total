import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';

import { ClassResultsPageComponent } from './class-results-page/class-results-page.component';
import { TotalClassResultsPageComponent } from './total-class-results-page/total-class-results-page.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ClassResultsPageComponent,
    TotalClassResultsPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
  ],
  exports: [
  ],
})
export class PagesModule { }
