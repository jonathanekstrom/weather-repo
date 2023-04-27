import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IForecast } from 'src/app/interfaces/forecast.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { ForecastService } from '../../services/forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  
  forecasts$: Observable<IForecast[]> | undefined;
  
  zip: string = '';

  constructor(private forecastService: ForecastService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.zip = params['zip'];
    })

    this.loadForecast();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadForecast(): void {
    this.forecasts$ = this.forecastService.getForecastArrByzip(this.zip);
  }
}
