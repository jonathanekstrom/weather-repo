import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map, mergeMap, toArray } from 'rxjs';
import { IForecastResponse } from '../../interfaces/forecast-response.interface';
import { IForecast } from '../../interfaces/forecast.interface';
import { environment } from '../../../environments/environment.prod'
import { UnitEnum } from 'src/app/shared/enums/unit-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getForecastArrByzip(zip: string): Observable<IForecast[]> {
    const url: string = `${environment.FORECAST_URL}?zip=${zip}&appid=${environment.APP_ID}&units=${UnitEnum.metric}`;

    return this.http.get<IForecastResponse>(url)
      .pipe(
        mergeMap(response => {
          const filteredList = this.filterByHour(response.list);
          return from(filteredList)
            .pipe(
              map((list: IForecastResponse['list'][0]) => {
                return this.mapListToForecast(list, response.city.name)
              }),
              toArray());
        }));
  }

  private mapListToForecast(list: IForecastResponse['list'][0], cityName: string): IForecast {
    return {
      id: list.weather[0].id,
      city: cityName,
      dt: list.dt,
      currentTemperature: list.main.temp,
      maxTemp: list.main.temp_max,
      minTemp: list.main.temp_min,
      currentConditions: list.weather[0].main
    };
  }

  private filterByHour(list: IForecastResponse['list'][0][]): IForecastResponse['list'][0][] {
    return list.filter(item => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate.getUTCHours() === 12;
    });
  }
}