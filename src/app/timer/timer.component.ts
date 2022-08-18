import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  public timeMeasure: string[] = ['seconds', 'minutes', 'houres'];
  public title: string ='';
  public timerActive: boolean = false;
  public color: ThemePalette = 'accent';
  public mode: ProgressSpinnerMode = 'determinate';
  public value: number = 0;
  public result: number = 0;
  public timer!: number;
  public timerForm!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
  ) {}

  public ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
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
    let progress = 0;

    const totalInSeconds = this.totalInSeconds;

    const step = 100 / totalInSeconds;

    this.timer = setInterval(() => {
      progress = progress + 1 * 1000;
      this.value += step;
      this.result = this.result + 1;
      if (progress >= totalInSeconds * 1000) {
        clearInterval(this.timer);
        this._finishTimer();
      }
    }, 1000);
  }

  public handlePause() {
    this.timerActive = false;
  }

  public handleStop() {
    this._finishTimer();
  }

  private _finishTimer() {
    this.value = 0;
    this.result = 0;
    this.timerActive = false;
  }


  allowStart() {
    if (this.totalInSeconds === 0) return false;
    else return true;
  }
}
