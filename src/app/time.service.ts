import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TimeService{
  public title = new BehaviorSubject<string>('Welcome to the PrettyTime');
}
