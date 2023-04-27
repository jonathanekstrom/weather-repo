import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWeather } from 'src/app/interfaces/weather.interface';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent {

  @Output() removeWeatherEvent: EventEmitter<IWeather> = new EventEmitter();

  @Input() weather: IWeather | undefined;

  onRemove(): void {
    if(this.weather) {
      this.removeWeatherEvent.emit(this.weather);
    }
  }

  getConditons(): string {
    return '';
  }
}
