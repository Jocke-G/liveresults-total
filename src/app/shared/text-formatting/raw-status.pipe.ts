import { Pipe, PipeTransform } from '@angular/core';

import { TextFormattingService } from './text-formatting.service';
import {
  ResultStatus,
} from 'src/app/services/liveresults/models';

@Pipe({
  name: 'rawStatus'
})
export class RawStatusPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: ResultStatus): unknown {
    return this.service.formatRawStatus(value);
  }
}
