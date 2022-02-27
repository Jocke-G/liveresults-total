import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LiveresultsService,
} from './liveresults/services';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LiveresultsService,
  ],
})
export class ServicesModule { }
