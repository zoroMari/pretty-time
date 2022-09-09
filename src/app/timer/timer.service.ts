import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Subject } from "rxjs";
import { ITime } from "../ITime.model";

@Injectable({providedIn: 'root'})
export class TimerService {
  private _lastTimers: ITime[];
  public lastTimersChange = new Subject<ITime[]>();
  public timerActive = new BehaviorSubject<boolean>(false);
  public totalInSeconds = new BehaviorSubject<number>(null);

  public get lastTimers() {
    if (localStorage.getItem('lastTimers')) return JSON.parse(localStorage.getItem('lastTimers'));
    else return [];
  }

  public saveNewTimers(timer: ITime): void {
    this._lastTimers = this.lastTimers;
    if (this._lastTimers.length === 5) {
      this._lastTimers.splice(5, 1);
      this._lastTimers.unshift(timer);
    } else {
      this._lastTimers.unshift(timer);
    }

    localStorage.setItem('lastTimers', JSON.stringify(this._lastTimers));
    this.lastTimersChange.next(this.lastTimers);
  }
}
