import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {

  getTimeObservable(): Observable<number> {
    return interval(1000)
      .pipe(
        startWith(this.getTime()),
        map(_ => {
          return this.getTime();
        }),
      );
  }

  getTime(): number {
    const date = new Date();
    const hours = date.getHours() * 60 * 60;
    const minutes = date.getMinutes() * 60;
    const seconds = date.getSeconds();
    return (hours + minutes + seconds) * 100;
  }
}
