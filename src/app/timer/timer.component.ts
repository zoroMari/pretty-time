import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {
  public title: string ='';

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
  ) {}

  ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
  }

}
