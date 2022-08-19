import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';
import { TimerService } from './timer.service';
import { ITime } from "../ITime.model";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  public timeMeasure: string[] = ['seconds', 'minutes', 'houres'];
  public title: string ='';
  public timerActive: boolean = false;
  public timerPause: boolean = false;

  public color: ThemePalette = 'accent';
  public mode: ProgressSpinnerMode = 'determinate';
  public value: number = 0;
  public result: number = 0;
  public progress = 0;
  public timer!: number;

  public timerForm!: FormGroup;
  public lastTimers: ITime[];

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
    private _timerService: TimerService,
  ) {}

  public ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);

    this._timerService.lastTimersChange.subscribe(
      (lastTimers: ITime[]) => this.lastTimers = lastTimers
    )

    this.lastTimers = this._timerService.lastTimers;
    console.log('lastTimers >>>', this.lastTimers);

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

  public handleStart() {
    this.timerActive = true;
    const totalInSeconds = this.totalInSeconds;
    const step = 100 / totalInSeconds;

    this.timer = setInterval(() => {
      this.progress = this.progress + 1 * 1000;
      this.value += step;
      this.result = this.result + 1;
      if (this.progress >= totalInSeconds * 1000) {
        clearInterval(this.timer);
        this._finishTimer();
      }
    }, 1000);
  }

  public handlePause() {
    clearInterval(this.timer);
    this.timerPause = true;
  }

  public handleContinue() {
    this.timerPause = false;
    this.handleStart();
  }

  public handleStop() {
    this._finishTimer();
  }

  private _finishTimer() {
    clearInterval(this.timer);
    
    this.value = 0;
    this.result = 0;
    this.progress = 0;
    this.timerActive = false;
    this.timerPause = false;

    this._timerService.saveNewTimers({
      date: new Date(),
      name: this.timerForm.value.name === '' ? 'Timer' : this.timerForm.value.name,
      houres: this.timerForm.value.houres,
      minutes: this.timerForm.value.minutes,
      seconds: this.timerForm.value.seconds,
    })
  }

  allowStart() {
    if (this.totalInSeconds === 0) return false;
    else return true;
  }
}
