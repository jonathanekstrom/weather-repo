import { Component, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { LocationService } from '../location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location-main',
  templateUrl: './location-main.component.html',
  styleUrls: ['./location-main.component.css']
})
export class LocationMainComponent {

  @ViewChild('f') form: NgForm | undefined;

  countries$: Observable<{ name: string; alpha2: string; countryCode: string; }[]> | undefined;

  selectedCountry: string = '';

  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private location: LocationService) { }

  ngOnInit(): void {
    this.countries$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((criteria: string) => {
        return this.location.searchCountries(criteria);
      })
    );
  }

  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  onAdd(): void {
    this.location.addToLocalStorage(this.form?.value.zip, this.selectedCountry);
  }

  highlightMatchingCharacters(text: string, searchTerm: string): string {
    if (!searchTerm) {
      return text;
    }

    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, (match) => `<span class="bold-text">${match}</span>`);
  }
}
