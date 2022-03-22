import { TimeService } from './time.service';
import { Injectable } from '@angular/core';

import {
  Result,
  ResultStatus,
} from 'src/app/services/liveresults/models';
import {
  StageResult,
} from 'src/app/components/total-class-results/model';

@Injectable({
  providedIn: 'root',
})
export class ResultHelperService {

  constructor(
    private timeService: TimeService,
  ) {
  }

  resultOk(result: Result) {
    return result.status === ResultStatus.OK || result.status === ResultStatus.NOT_STARTED_YET_10;
  }

  possiblyOk(result: StageResult |undefined) {
    if(result === undefined)
      return false;

    return result.status === ResultStatus.OK || (result.previousOk && result.status === ResultStatus.NOT_STARTED_YET_10);
  }

  getVirtualTime(a: Result): number {
    if (a.status === ResultStatus.OK) {
      return parseFloat(a.result);
    } else {
      return this.timeService.getTime() - a.start;
    }
  }
}
