import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeService } from '../time.service';
import { IActivePlaceAndDate } from './IActivePlaceAndDate.model';
import { WorldClockService } from './world-clock.service';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.sass']
})
export class WorldClockComponent implements OnInit, OnDestroy {

  public areasWaiting: boolean = false;
  public citiesWaiting: boolean = false;
  public timeWaiting: boolean = false;
  public error: boolean = false;

  public title: string ='';
  public areas: string[];
  public cities: string[];
  public activeDate: Date;
  public activePlaceAndDate: IActivePlaceAndDate = {
    area: '',
    city: '',
    date: null,
  };
  public timeZoneForm!: FormGroup;

  private _sub = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _timeService: TimeService,
    private _worldClock: WorldClockService,
  ) {}

  ngOnInit(): void {
    this.error = false;

    this._sub.add(
      this._worldClock.waitingTime.subscribe(
      value => this.timeWaiting = value
      )
    );

    this._sub.add(
      this._worldClock.waitingAreas.subscribe(
        value => this.areasWaiting = value
      )
    );

    this._sub.add(
      this._worldClock.waitingCities.subscribe(
        value => this.citiesWaiting = value
      )
    );

    this._timeService.title.next(this._route.snapshot.data['title']);

    this.timeZoneForm = new FormGroup({
      area: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })

    this._fetchAreas();

    this._sub.add(
      this.timeZoneForm.get('area').valueChanges.subscribe(
        value => {
          if (!value) return;
          else {
            this._worldClock.fetchCities(value).subscribe(
              cities => {
                this.cities = cities;
                this._worldClock.waitingCities.next(false);
              },
              error => {
                this.error = true;
              }
            );
          }
        }
      )
    )
  }

  public handleGetTime() {
    this.activePlaceAndDate.area = this.timeZoneForm.get('area').value;
    this.activePlaceAndDate.city = this.timeZoneForm.get('city').value;

    let dateAndTime;

    this._sub.add(
      this._worldClock.fetchTime(this.activePlaceAndDate.area, this.activePlaceAndDate.city).subscribe(
        value => {
          dateAndTime = value;
          this.activePlaceAndDate.date = new Date(dateAndTime.datetime);
          this._worldClock.waitingTime.next(false);
        },
        error => {
          this.error = true;
        }
      )
    )


    this.timeZoneForm.reset();
  }


  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public handleTryAgain() {
    this._fetchAreas();
  }

  private _fetchAreas() {
    this.error = false;

    this._worldClock.fetchAreas().subscribe(
      timeZones => {
        this.areas = timeZones;
        this._worldClock.waitingAreas.next(false);
      },
      error => {
        this.error = true;
      }
    );
  }

}
