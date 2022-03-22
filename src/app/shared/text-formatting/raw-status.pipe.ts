import { Pipe, PipeTransform } from '@angular/core';

import {
  ResultStatus,
} from 'src/app/services/liveresults/models';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'rawStatus',
})
export class RawStatusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(resultStatus: ResultStatus): string {
    return this.service.formatRawStatus(resultStatus);
  }
}
