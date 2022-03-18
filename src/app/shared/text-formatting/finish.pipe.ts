import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';
import {
  Result,
  ResultStatus,
} from 'src/app/services/liveresults/models';

@Pipe({
  name: 'finish'
})
export class FinishPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(result: Result, time: number|null): string {
    if(result.status === ResultStatus.OK) {
      return this.service.formatTime(parseInt(result.result));
    }
    if(result.status === ResultStatus.NOT_STARTED_YET_10 && time !== null) {
      return `(${this.service.formatTime(time - result.start)})`;
    }
    return this.service.formatStatus(result.status);
  }
}
