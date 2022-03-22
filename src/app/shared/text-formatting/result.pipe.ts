import { Pipe, PipeTransform } from '@angular/core';

import {
  Result,
} from 'src/app/services/liveresults/models';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'result',
})
export class ResultPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(result: Result): string {
    return this.service.formatResult(result);
  }
}
