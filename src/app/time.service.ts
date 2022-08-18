import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITime } from "./ITime.model";

@Injectable({ providedIn: 'root' })
export class TimeService{
  public title = new BehaviorSubject<string>('Welcome to the PrettyTime');

  public get lastTimers() {
    if (localStorage.getItem('lastTimers')) {
      return JSON.parse(localStorage.getItem('lastTimers'));
    } else return [];
  }


  public stopTimer(timer: ITime) {

    localStorage.setItem('lastTimers', JSON.stringify(timer));
  }


}
