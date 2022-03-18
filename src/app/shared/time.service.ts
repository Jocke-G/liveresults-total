import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getTime(): number {
    const date = new Date();
    const hours = date.getHours() * 60 * 60;
    const minutes = date.getMinutes() * 60;
    const seconds = date.getSeconds();
    return (hours + minutes + seconds) * 100;
  }
}
