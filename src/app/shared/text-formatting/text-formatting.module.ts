import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishPipe } from './finish.pipe';
import { RawStatusPipe } from './raw-status.pipe';
import { ResultPipe } from './result.pipe';
import { StatusPipe } from './status.pipe';
import { TimePipe } from './time.pipe';
import { TimePlusPipe } from './time-plus.pipe';
import { TotalPipe } from './total.pipe';



@NgModule({
  declarations: [
    FinishPipe,
    RawStatusPipe,
    ResultPipe,
    StatusPipe,
    TimePipe,
    TimePlusPipe,
    TotalPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FinishPipe,
    RawStatusPipe,
    ResultPipe,
    StatusPipe,
    TimePipe,
    TimePlusPipe,
    TotalPipe,
  ],
})
export class TextFormattingModule { }
