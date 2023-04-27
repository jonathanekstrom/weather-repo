import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherItemComponent } from './components/weather-list/weather-item/weather-item.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherMainComponent } from './components/weather-main/weather-main.component'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WeatherListComponent,
    WeatherItemComponent,
    WeatherForecastComponent,
    WeatherMainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WeatherRoutingModule,
  ],
  providers: [
    
  ]
})
export class WeatherModule { }
