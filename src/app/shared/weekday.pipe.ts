import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {
  
  private weekdays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  transform(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    const weekdayNumber = date.getUTCDay();
    return this.weekdays[weekdayNumber];
  }
}
