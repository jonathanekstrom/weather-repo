import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-location-button',
  templateUrl: './add-location-button.component.html',
  styleUrls: ['./add-location-button.component.css']
})
export class AddLocationButtonComponent implements OnInit {

  @Output() onAddEvent: EventEmitter<boolean> = new EventEmitter();

  @Input() initialTemplate: TemplateRef<any> | null = null;
  @Input() workingTemplate: TemplateRef<any> | null = null;
  @Input() doneTemplate: TemplateRef<any> | null = null;
  @Input() invalidForm: boolean | null = false;

  inSubmission: boolean = false;

  action$ = timer(2000);

  currentTemplate: TemplateRef<any> | null = null;

  ngOnInit() {
    this.currentTemplate = this.initialTemplate;
  }

  onAdd() {
    this.inSubmission = true;
    this.onAddEvent.emit(this.inSubmission);
    this.currentTemplate = this.workingTemplate;
    this.action$.subscribe(() => {
      this.currentTemplate = this.doneTemplate;

      setTimeout(() => {
        this.currentTemplate = this.initialTemplate;
        this.inSubmission = false;
      }, 500);
    });
  }
}
