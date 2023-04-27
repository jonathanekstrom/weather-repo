import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekdayPipe } from './weekday.pipe';
import { DropdownDirective } from './directives/dropdown.directive';
import { AlertComponent } from './components/alert/alert.component';
import { BoldSpanPipe } from './pipes/bold-span.pipe';

@NgModule({
  declarations: [
    WeekdayPipe,
    DropdownDirective,
    AlertComponent,
    BoldSpanPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WeekdayPipe,
    DropdownDirective,
    AlertComponent,
    BoldSpanPipe,
  ]
})
export class SharedModule { }
