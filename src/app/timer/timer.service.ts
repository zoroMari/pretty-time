import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITime } from "../ITime.model";

@Injectable({providedIn: 'root'})
export class TimerService {
  private _lastTimers: ITime[];
  public lastTimersChange = new Subject<ITime[]>();

  public get lastTimers() {
    if (localStorage.getItem('lastTimers')) return JSON.parse(localStorage.getItem('lastTimers'));
    else return [];
  }

  public saveNewTimers(timer: ITime): void {
    this._lastTimers = this.lastTimers;
    this._lastTimers.push(timer);
    localStorage.setItem('lastTimers', JSON.stringify(this._lastTimers));
    this.lastTimersChange.next(this.lastTimers);
  }
}
