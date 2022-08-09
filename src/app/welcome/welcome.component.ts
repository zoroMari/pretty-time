import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  public title: string ='';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _timeService: TimeService,
  ) {}

  ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);
  }

  handleNavigate(route: string) {
    this._router.navigate([route]);
  }

}
