import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationItemComponent } from './components/location-item/location-item.component';



@NgModule({
  declarations: [
    AddLocationComponent,
    LocationListComponent,
    LocationItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule 
  ]
})
export class WeatherModule { }
