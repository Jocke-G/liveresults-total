import { Injectable } from '@angular/core';

import { Result } from 'src/app/services/liveresults/models/result';

@Injectable({
  providedIn: 'root'
})
export class TextFormattingService {

  formatTime(value: number): string {
    if(!value)
      return '';

    var hours = Math.floor(value / (60 * 60 * 100));
    var minutes = Math.floor((value %= (60 * 60 * 100)) / (60 * 100));
    var seconds = Math.floor((value %= (60 * 100)) / (100));

    return ''.concat(`${hours > 0?hours.toString().concat(':'):''}${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`);
  }

  formatStatus(status: number) {
    switch(status){
      case 0:
        return "OK";
      case 1:
        return "Ej start";
      case 2:
        return "Ej godkänd";
      case 3:
        return "Felstämplad";
      case 4:
        return "Diskvalificerad";
      case 5:
        return "Över maxtid";
      case 9:
        return "Ännu ej start";
      case 10:
        return "Ej start";
        case 11:
        return "Walk over";
      case 12:
        return "Moved up";
        default:
      return "?";
    }
  }

  formatResult(result: Result) {
    if(!result) {
      return "-";
    }
    if(result.status === 0) {
      return this.formatTime(parseInt(result.result));
    } else {
      return this.formatStatus(result.status);
    }
  }
}
