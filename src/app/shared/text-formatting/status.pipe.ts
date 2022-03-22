import { Pipe, PipeTransform } from '@angular/core';

import {
  ResultStatus,
} from 'src/app/services/liveresults/models';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(resultStatus: ResultStatus): string {
    return this.service.formatStatus(resultStatus);
  }
}
