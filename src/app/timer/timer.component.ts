import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITime } from '../ITime.model';
import { TimeService } from '../time.service';
import { TimerService } from './timer.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  public timeMeasure: string[] = ['seconds', 'minutes', 'houres'];
  public title: string ='';
  public timerActive: boolean = false;

  public timerForm!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
    private _timerService: TimerService,
  ) {}

  public ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
    this._timerService.timerActive.subscribe(
      (timerActive) => this.timerActive = timerActive
    )

    this.timerForm = new FormGroup({
      houres: new FormControl('0', [Validators.required, Validators.min(0)]),
      minutes: new FormControl('0', [Validators.required, Validators.min(0)]),
      seconds: new FormControl('0', [Validators.required, Validators.min(0)]),
      name: new FormControl(''),
    })
  }

  public get totalInSeconds() {
    const houres: number = +this.timerForm.value.houres;
    const minutes: number = +this.timerForm.value.minutes;
    const seconds: number = +this.timerForm.value.seconds;

    return houres * 60 * 60 + minutes * 60 + seconds;
  }

  allowStart() {
    if (this.totalInSeconds === 0) return false;
    else return true;
  }

  public handleStart() {
    this._timerService.timerActive.next(true);

  }

  public saveTimer() {
    this._timerService.saveNewTimers({
      date: new Date(),
      name: this.timerForm.value.name === '' ? 'Timer' : this.timerForm.value.name,
      houres: this.timerForm.value.houres,
      minutes: this.timerForm.value.minutes,
      seconds: this.timerForm.value.seconds,
    })
  }
}
