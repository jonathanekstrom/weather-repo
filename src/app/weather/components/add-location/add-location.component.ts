import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {

  zipCode: string | undefined;

  constructor(private storage: StorageService) { }

  onAddZipCode(): void {
    
  }

}
