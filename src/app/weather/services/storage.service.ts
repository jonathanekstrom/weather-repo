import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private ls_key: string = 'ZIP_CODES';

  private zipCodeSource = new BehaviorSubject<string[]>(this.getTrackedTeamsFromLocalStorage());
  zipCodes$ = this.zipCodeSource.asObservable();

  addZipcode(zipCode: string): void {
    const currentValue = this.zipCodeSource.getValue();
    const updatedValue = [...currentValue, zipCode];
    this.zipCodeSource.next(updatedValue);
    this.saveTrackedTeamsToLocalStorage(updatedValue);
  }

  private saveTrackedTeamsToLocalStorage(zipCodes: string[]): void {
    localStorage.setItem(this.ls_key, JSON.stringify(zipCodes));
  }

  private getTrackedTeamsFromLocalStorage(): string[] {
    const storedTeams = localStorage.getItem(this.ls_key);
    return storedTeams ? JSON.parse(storedTeams) : [];
  }
}
