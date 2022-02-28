import { StageResult } from './../components/total-class-results/stage-result';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultPipe } from './result.pipe';
import { StageResultPipe } from './stage-result.pipe';
import { TimePipe } from './time.pipe';



@NgModule({
  declarations: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ResultPipe,
    StageResultPipe,
    TimePipe,
  ]
})
export class SharedModule { }
