import { Pipe, PipeTransform } from '@angular/core';

import {
  StageResult,
} from 'src/app/components/total-class-results/model';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(result: StageResult|undefined, time: number|null): string {
    return this.service.formatTotal(result, time);
  }
}
