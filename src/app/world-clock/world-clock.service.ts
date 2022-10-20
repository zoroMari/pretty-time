import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WorldClockService {
  public waitingTime = new Subject<boolean>();
  public waitingAreas = new Subject<boolean>();
  public waitingCities = new Subject<boolean>();

  constructor(private _http: HttpClient) {}

  public fetchAreas() {
    this.waitingAreas.next(true);

    return this._http.get('http://worldtimeapi.org/api/timezone/')
      .pipe(map(
        value => {
          let areas = [];

          for (let key in value)  {
            let area = value[key].split('/');

            if (
              !areas.includes(area[0]) &&
              area[0][1] !== (area[0][1]).toUpperCase() &&
              area[0].length > 3
            ) {
              areas.push(area[0]);
            }
          }

          return areas;
        }
      ))
  }

  public fetchCities(area: string) {
    this.waitingCities.next(true);

    return this._http.get<string[]>(`http://worldtimeapi.org/api/timezone/${area}/`)
      .pipe(map(
        value => {
          let cities = [];

          for (let key in value) {
            cities.push(value[key].split('/').splice(1).join('/'))
          }

          return cities;
        }
      ))
  }

  public fetchTime(area: string, city: string) {
    this.waitingTime.next(true);

    return this._http.get(`http://worldtimeapi.org/api/timezone/${area}/${city}/`)
  }

}
