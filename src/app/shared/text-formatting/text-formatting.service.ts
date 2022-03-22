import { Injectable } from '@angular/core';

import {
  StageResult,
} from 'src/app/components/total-class-results/model';
import {
  Result,
  ResultStatus,
} from 'src/app/services/liveresults/models';

@Injectable({
  providedIn: 'root'
})
export class TextFormattingService {

  formatTimePlus(value: string): string {
    if(value === undefined || value === null || value === '')
      return '';

    return `+${this.formatTime(parseFloat(value))}`;
  }

  formatTime(value: number|undefined): string {
    if(value === undefined || value === null || value < 0)
      return '';

    var hours = Math.floor(value / (60 * 60 * 100));
    var minutes = Math.floor((value %= (60 * 60 * 100)) / (60 * 100));
    var seconds = Math.floor((value %= (60 * 100)) / (100));

    return ''.concat(`${hours > 0?hours.toString().concat(':'):''}${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`);
  }

  formatRawStatus(status: ResultStatus): string {
    return ResultStatus[status];
  }

  formatStatus(status: ResultStatus): string {
    switch(status){
      case ResultStatus.OK:
        return "OK";
      case ResultStatus.DID_NOT_START:
        return "Ej start";
      case ResultStatus.DID_NOT_FINISH:
        return "Ej godkänd";
      case ResultStatus.MISSED_PUNCH:
        return "Felstämplad";
      case ResultStatus.DISQUALIFIED:
        return "Diskvalificerad";
      case ResultStatus.OVER_TIME:
        return "Över maxtid";
      case ResultStatus.NOT_STARTED_YET_09:
        return "Ännu ej start";
      case ResultStatus.NOT_STARTED_YET_10:
        return "Ännu ej start";
      case ResultStatus.WALK_OVER:
        return "Walk over";
      case ResultStatus.MOVED_UP:
        return "Moved up";
      default:
        return "?";
    }
  }

  formatResult(result: Result) {
    if(!result) {
      return "-";
    }
    if(result.status === ResultStatus.OK) {
      return this.formatTime(parseInt(result.result));
    }

    return this.formatStatus(result.status);
  }

  formatFinish(result: Result | undefined, time: number | null): string {
    if(!result) {
      return '-';
    }
    if(result.status === ResultStatus.OK) {
      return this.formatTime(parseInt(result.result));
    }
    if(result.status === ResultStatus.NOT_STARTED_YET_10 && time !== null) {
      return `(${this.formatTime(time - result.start)})`;
    }
    return this.formatStatus(result.status);
  }

  formatTotal(result: StageResult | undefined, time: number | null): string {
    if(!result) {
      return '-';
    }
    if(result.status === ResultStatus.OK) {
      return this.formatTime(result.totalTime);
    }
    if(result.status === ResultStatus.NOT_STARTED_YET_10 && time !== null) {
      return `(${this.formatTime(result.totalVirtualTime)})`;
    }

    return "-";
  }
}
