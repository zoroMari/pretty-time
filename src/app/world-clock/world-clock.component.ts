import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from '../time.service';
import { IActivePlaceAndDate } from './IActivePlaceAndDate.model';
import { WorldClockService } from './world-clock.service';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.sass']
})
export class WorldClockComponent implements OnInit {
  public title: string ='';
  public areas;
  public cities;
  public activeDate;
  public activePlaceAndDate: IActivePlaceAndDate = {
    area: '',
    city: '',
    date: null,
  };
  public timeZoneForm!: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
    private _worldClock: WorldClockService,
  ) {}

  ngOnInit(): void {
    this._timeService.title.next(this._route.snapshot.data['title']);

    this.timeZoneForm = new FormGroup({
      area: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })

    this._worldClock.fetchAreas().subscribe(
        timeZones => {
          this.areas = timeZones;
        }
    );

    this.timeZoneForm.get('area').valueChanges.subscribe(
      value => {
        if (!value) return;
        else {
          this._worldClock.fetchCities(value).subscribe(
            cities => {
              this.cities = cities;
            }
          );
        }
      }
    )
  }

  public handleGetTime() {
    this.activePlaceAndDate.area = this.timeZoneForm.get('area').value;
    this.activePlaceAndDate.city = this.timeZoneForm.get('city').value;

    let dateAndTime;

    this._worldClock.fetchTime(this.activePlaceAndDate.area, this.activePlaceAndDate.city).subscribe(
      value => {
        dateAndTime = value;
        this.activePlaceAndDate.date = new Date(dateAndTime.datetime);
      }
    );

    this.timeZoneForm.reset();
  }


}
