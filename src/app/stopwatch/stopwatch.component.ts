import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';
import { StopwatchService } from './stopwatch.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.sass']
})
export class StopwatchComponent implements OnInit {
  public activeStopwatch: boolean = false;
  public pausedStopwatch: boolean = false;

  public form!: FormGroup;

  public houres: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public timer!: number;

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
    private _stopwatchService: StopwatchService,
  ) {}

  ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);

    this.form = new FormGroup({
      name: new FormControl(''),
    })
  }

  private _startStopWatch() {
    this.timer = setInterval(() => {
      this.seconds += 1;

      if (this.seconds === 10) {
        this.minutes += 1;
        this.seconds = 0;
      }

      if (this.minutes === 2) {
        this.houres += 1;
        this.minutes = 0;
        this.seconds = 0;
      }
    }, 1000);
  }

  public handleStart() {
    this.activeStopwatch = true;
    this._startStopWatch();
  }

  public handlePause() {
    clearInterval(this.timer);
    this.pausedStopwatch = true;
  }

  public handleContinue() {
    this.pausedStopwatch = false;
    this._startStopWatch();
  }

  public handleStop() {
    this.activeStopwatch = false;
    this.pausedStopwatch = false;

    clearInterval(this.timer);

    this._stopwatchService.saveStopwatches({
      date: new Date(),
      name: this.form.value.name ? this.form.value.name : 'Stopwatch',
      houres: this.houres.toString(),
      minutes: this.minutes.toString(),
      seconds: this.seconds.toString(),
    })

    this.houres = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.form.setValue({
      name: '',
    })
  }

  public handleDeleteAll() {
    this._stopwatchService.deleteStopwatches();
  }
}
