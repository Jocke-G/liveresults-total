import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultPipe } from './result.pipe';
import { TimePipe } from './time.pipe';



@NgModule({
  declarations: [
    ResultPipe,
    TimePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ResultPipe,
    TimePipe,
  ]
})
export class SharedModule { }
