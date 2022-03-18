import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';
import {
  ResultStatus,
} from 'src/app/services/liveresults/models';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: ResultStatus): string {
    return this.service.formatStatus(value);
  }
}
