import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishPipe } from './finish.pipe';
import { RawStatusPipe } from './raw-status.pipe';
import { ResultPipe } from './result.pipe';
import { StageResultPipe } from './stage-result.pipe';
import { StatusPipe } from './status.pipe';
import { TimePipe } from './time.pipe';
import { TimePlusPipe } from './time-plus.pipe';



@NgModule({
  declarations: [
    FinishPipe,
    RawStatusPipe,
    ResultPipe,
    StageResultPipe,
    StatusPipe,
    TimePipe,
    TimePlusPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FinishPipe,
    RawStatusPipe,
    ResultPipe,
    StageResultPipe,
    StatusPipe,
    TimePipe,
    TimePlusPipe,
  ],
})
export class TextFormattingModule { }
