import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILsData } from '../interfaces/local-storage.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly VALUE_KEY_ARR = 'values';

  private subject = new BehaviorSubject<ILsData[]>(this.getFromLS());
  zipArr$ = this.subject.asObservable();

  add(zip: string, code: string): void {
    const currentValue = this.subject.getValue();
    const updatedValue = [...currentValue, { zip: zip, code } as ILsData];
    this.subject.next(updatedValue);
    this.saveToLS(updatedValue);
  }

  remove(index: number): void {
    const currentValue = this.subject.getValue();
    currentValue.splice(index, 1);
    this.subject.next([...currentValue]);
    this.saveToLS(currentValue);
  }

  private saveToLS(localstorage: ILsData[]): void {
    localStorage.setItem(this.VALUE_KEY_ARR, JSON.stringify(localstorage));
  }

  private getFromLS(): ILsData[] {
    const storedzipArr = localStorage.getItem(this.VALUE_KEY_ARR);
    return storedzipArr ? JSON.parse(storedzipArr) : [];
  }
}
