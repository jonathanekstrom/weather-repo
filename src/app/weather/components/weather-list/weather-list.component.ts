import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import { Observable, Subscription, interval, startWith, switchMap, tap } from 'rxjs';
import { IWeather } from 'src/app/interfaces/weather.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  weatherArr$: Observable<IWeather[]> | undefined | null;

  private subscriber = new Subscription();

  constructor(private weatherService: WeatherService, private storage: StorageService) { }

  ngOnInit(): void {
    this.loadWeather();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe()
  }

  loadWeather(): void {
    this.subscriber = this.storage.zipArr$.subscribe(() => {
      this.weatherArr$ = this.weatherService.weatherArr$;
    });
  }

  onRemove(index: number): void {
    this.storage.remove(index);
  }
}
