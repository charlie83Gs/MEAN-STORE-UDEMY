import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker-legal-age',
  templateUrl: './date-picker-legal-age.component.html',
  styleUrls: ['./date-picker-legal-age.component.scss']
})
export class DatePickerLegalAgeComponent implements OnInit {
  CURRENTDAY= {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate() + 1,
  }
  minDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 150,
    month: this.CURRENTDAY.month ,
    day: this.CURRENTDAY.day,
  };
  maxDate: NgbDateStruct  = {
    year: this.CURRENTDAY.year - 18,
    month: this.CURRENTDAY.month ,
    day: this.CURRENTDAY.day,
  };
  model = this.maxDate;

  @Output() newDateEvent = new EventEmitter<NgbDateStruct>();
  constructor() { }

  ngOnInit(): void {
  }

  onDateChanged(){
    this.newDateEvent.emit(this.model);
  }
}
