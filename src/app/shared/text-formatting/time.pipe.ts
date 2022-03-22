import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(time: number): string {
    return this.service.formatTime(time);
  }
}
