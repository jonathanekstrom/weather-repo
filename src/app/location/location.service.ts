import { Injectable } from "@angular/core";
import { StorageService } from "../shared/storage.service";
import { Observable, catchError, filter, map, of, tap } from "rxjs";
import { countryArr } from '../../assets/countries'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private storage: StorageService) { }

  addToLocalStorage(zip: string, country: string) {
    this.storage.add(zip, country);
  }

  searchCountries(term: string): Observable<{ name: string; alpha2: string; countryCode: string; }[]> {
    if (!term.trim()) {
      return of([]);
    }

    return of(countryArr).pipe(
      map(arr => {
        return arr.filter(country => country.name.toLowerCase().includes(term.toLocaleLowerCase()))
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}