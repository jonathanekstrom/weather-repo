import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherMainComponent } from './components/weather-main/weather-main.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherMainComponent,
    children: [
      {
        path: '',
        component: WeatherListComponent
      },
      {
        path: 'forecast/:zip',
        component: WeatherForecastComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WeatherRoutingModule { }
