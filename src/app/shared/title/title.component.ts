import { Component, Input, OnInit } from '@angular/core';
import { TimeService } from '../../time.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.sass']
})
export class TitleComponent implements OnInit {
  public title!: string;
  @Input() inputTitle: boolean;

  constructor(
    private _timeService: TimeService,
  ) { }

  ngOnInit(): void {
    this._timeService.title.subscribe(
      title => this.title = title
    )
  }

}
