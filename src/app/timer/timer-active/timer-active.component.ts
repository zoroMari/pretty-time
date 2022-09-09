import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TimerService } from "../timer.service";

@Component({
  selector: 'app-timer-active',
  templateUrl: 'timer-active.component.html',
  styleUrls: ['timer-active.component.sass'],
})
export class TimerActiveComponent implements OnInit {
  public color: ThemePalette = 'accent';
  public mode: ProgressSpinnerMode = 'determinate';
  public value: number = 0;
  public result: number = 0;
  public progress = 0;
  public timer!: number;

  public timerPause = false;
  public timerFinished = false;
  public totalInSeconds: number;

  @Output() onFinishTimer = new EventEmitter<number>();
  @Output() onRestartTimer = new EventEmitter<any>();


  constructor(
    private _timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this._timerService.totalInSeconds.subscribe(
      (totalInSeconds) => this.totalInSeconds = totalInSeconds
    )

    this.startTimer();
  }

  public startTimer() {
    this.timerFinished = false;

    const step = 100 / this.totalInSeconds;

    this.timer = setInterval(() => {
      this.progress = this.progress + 1 * 1000;
      this.value += step;
      this.result = this.result + 1;
      if (this.progress >= this.totalInSeconds * 1000) {
        clearInterval(this.timer);
        this.handleStop();
      }
    }, 1000);
  }

  public handlePause() {
    clearInterval(this.timer);
    this.timerPause = true;
  }

  public handleContinue() {
    this.timerPause = false;
    this.startTimer();
  }

  public handleStop() {
    this.timerFinished = true;
    clearInterval(this.timer);
    const fullfil = Math.round(this.result / this.totalInSeconds * 100);

    this.onFinishTimer.emit(fullfil);
  }

  private _clearTimer() {
    clearInterval(this.timer);

    this.value = 0;
    this.result = 0;
    this.progress = 0;
    this.timerPause = false;
  }

  public handleGoBack() {
    this.timerFinished = false;
    this._timerService.timerActive.next(false);
    this._clearTimer();
  }

  public handleRestart() {
    this._clearTimer();
    this.onRestartTimer.emit();
    this.startTimer();
  }
}
