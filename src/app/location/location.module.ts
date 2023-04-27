import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddLocationButtonComponent } from './add-location-button/add-location-button.component';
import { SharedModule } from '../shared/shared.module';
import { LocationMainComponent } from './location-main/location-main.component';

@NgModule({
  declarations: [
    AddLocationButtonComponent,
    LocationMainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    LocationMainComponent
  ]
})
export class LocationModule { }
