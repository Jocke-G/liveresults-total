import { Pipe, PipeTransform } from '@angular/core';
import { StageResult } from '../components/total-class-results/stage-result';
import { TextFormattingService } from './text-formatting.service';

@Pipe({
  name: 'stageResult'
})
export class StageResultPipe implements PipeTransform {

  constructor(
    private service: TextFormattingService,
  ) {
  }

  transform(value: StageResult): string {
    return this.service.formatStageResult(value);
  }
}
