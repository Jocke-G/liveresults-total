import { Pipe, PipeTransform } from '@angular/core';

import {
  Result,
} from 'src/app/services/liveresults/models';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'finish',
})
export class FinishPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(result: Result|undefined, time: number|null): string {
    return this.service.formatFinish(result, time);
  }
}
