import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { ClassResultsPageComponent } from './class-results-page/class-results-page.component';



@NgModule({
  declarations: [
    ClassResultsPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    ClassResultsPageComponent,
  ],
})
export class PagesModule { }
