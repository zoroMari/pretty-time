import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ITime } from "../ITime.model";

@Injectable({providedIn: 'root'})
export class StopwatchService {
  private _lastStopwatches: ITime[] = [];
  public lastStopwatchesChanges = new Subject<ITime[]>();

  get lastStopwatches() {
    if (localStorage.getItem('lastStopwatches')) {
      return JSON.parse(localStorage.getItem('lastStopwatches'));
    } else return [];
  }

  public saveStopwatches(time: ITime) {
    this._lastStopwatches = this.lastStopwatches;

    if (this._lastStopwatches.length === 5) {
      this._lastStopwatches.splice(4,1);
      this._lastStopwatches.unshift(time);
    } else {
      this._lastStopwatches.unshift(time);
    }

    localStorage.setItem('lastStopwatches', JSON.stringify(this._lastStopwatches));
    this.lastStopwatchesChanges.next(this.lastStopwatches);
  }

  public deleteStopwatches() {
    localStorage.setItem('lastStopwatches', JSON.stringify([]));
    this.lastStopwatchesChanges.next(this.lastStopwatches);
  }
}
