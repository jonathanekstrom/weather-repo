import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, interval, map, startWith, switchMap, tap } from 'rxjs';
import { ILsData } from 'src/app/interfaces/local-storage.interface';
import { IWeatherResponse } from 'src/app/interfaces/weather-response.interface';
import { IWeather } from 'src/app/interfaces/weather.interface';
import { UnitEnum } from 'src/app/shared/enums/unit-enum.enum';
import { StorageService } from 'src/app/shared/storage.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private subject = new BehaviorSubject<IWeather[]>([]);
  weatherArr$ = this.subject.asObservable();

  constructor(private http: HttpClient, private storage: StorageService) {
    this.pollDataEvery30Second();
  }

  private pollDataEvery30Second() {
    interval(30000).pipe(
      startWith(0),
      switchMap(() => this.storage.zipArr$),
      tap(() => {
        console.log("timestamp: " + new Date());
      })
    ).subscribe(ILsDataArr => {
      this.weatherArr$ = this.getWeatherArrByzipArr(ILsDataArr);
    });
  }

  private getWeatherArrByzipArr(zipArr: ILsData[]): Observable<IWeather[]> {
    const weatherArr = zipArr.map(localstorage => {
      return this.getWeatherByzip(localstorage)
    })
    return forkJoin(weatherArr);
  }

  private getWeatherByzip(localstorage: ILsData): Observable<IWeather> {
    const url: string = `${environment.WEATHER_URL}?zip=${localstorage.zip},${localstorage.code}&appid=${environment.APP_ID}&units=${UnitEnum.metric}`;
    return this.http.get<IWeatherResponse>(url)
      .pipe(
        map(response => {
          const weather = this.mapResponseToWeather(response, localstorage);
          return weather;
        }),
      );
  }

  private mapResponseToWeather(weatherResponse: IWeatherResponse, localstorage: ILsData): IWeather {
    return {
      id: weatherResponse.weather[0].id,
      city: weatherResponse.name,
      zip: localstorage.zip,
      countrycode: localstorage.code,
      currentConditions: weatherResponse.weather[0].main,
      currentTemperature: weatherResponse.main.temp,
      minTemp: weatherResponse.main.temp_min,
      maxTemp: weatherResponse.main.temp_max
    };
  }
}