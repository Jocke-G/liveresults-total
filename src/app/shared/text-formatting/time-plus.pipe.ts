import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'timePlus',
})
export class TimePlusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(timePlus: string): string {
    return this.service.formatTimePlus(timePlus);
  }
}
