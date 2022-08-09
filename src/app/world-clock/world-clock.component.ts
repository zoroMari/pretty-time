import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.sass']
})
export class WorldClockComponent implements OnInit {
  public title: string ='';

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
  ) {}

  ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
  }
}
