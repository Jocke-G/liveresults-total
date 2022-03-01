import { Pipe, PipeTransform } from '@angular/core';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'timePlus'
})
export class TimePlusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: number): string {
    if(value === undefined || value === null)
      return '';

    return `+${this.service.formatTime(value)}`;
  }
}
