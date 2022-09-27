import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WorldClockService {
  constructor(private _http: HttpClient) {}

  public fetchAreas() {
    return this._http.get('http://worldtimeapi.org/api/timezone')
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
    return this._http.get<string[]>(`http://worldtimeapi.org/api/timezone/${area}`)
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
    return this._http.get(`http://worldtimeapi.org/api/timezone/${area}/${city}`)
  }

}
