import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent implements OnInit {
  model: NgbDateStruct;
  @Output() newDateEvent = new EventEmitter<NgbDateStruct>();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChanged(){
    this.newDateEvent.emit(this.model);
  }
}
