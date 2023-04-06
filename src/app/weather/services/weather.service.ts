import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { LocationService } from './location.service';
import { IWeatherRequest } from '../interfaces/weather-request.interface';
import { Coordinates } from '../classes/Coordinates.class';
import { ILocationRequest } from '../interfaces/location-request.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private http: HttpClient) { }

  getWeather(zip: string, countryCode: string): Observable<IWeatherRequest> {
    return this.getZipLocation(zip, countryCode).pipe(
      switchMap(coordinates => this.getWeatherByCoordinates(coordinates)));
  }

  getZipLocation(zip: string, countryCode: string): Observable<Coordinates> {
    const baseUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${this.apiKey}`;
    return this.http.get<ILocationRequest>(baseUrl).pipe(
      map(location => {
        return Coordinates.createCoordinates(location.lat, location.lon);
      })
    );
  }

  getWeatherByCoordinates(coordinates: Coordinates): Observable<IWeatherRequest> {
    const newUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.getLat()}&lon=${coordinates.getLon()}&appid=${this.apiKey}`;
    return this.http.get<IWeatherRequest>(newUrl);
  }
}
