import { Pipe, PipeTransform } from '@angular/core';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: number): string {
    return this.service.formatTime(value);
  }
}
