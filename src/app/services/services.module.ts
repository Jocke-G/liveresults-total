import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LiveresultsService,
} from './liveresults/services';



@NgModule({
  providers: [
    LiveresultsService,
  ],
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
})
export class ServicesModule { }
