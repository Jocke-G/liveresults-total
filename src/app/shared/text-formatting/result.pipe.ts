import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';
import {
  Result,
} from 'src/app/services/liveresults/models';

@Pipe({
  name: 'result'
})
export class ResultPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: Result): string {
    return this.service.formatResult(value);
  }
}
