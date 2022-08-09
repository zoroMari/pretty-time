import { Component, OnInit } from '@angular/core';
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
  public title: string ='';
  public timerActive: boolean = true;
  public color: ThemePalette = 'accent';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 500;


  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
  ) {}

  public ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
  }

  public handleStart() {
    this.timerActive = true;

  }

  public handlePause() {
    this.timerActive = false;
  }

  public handleStop() {
    this.timerActive = false;
  }
}
