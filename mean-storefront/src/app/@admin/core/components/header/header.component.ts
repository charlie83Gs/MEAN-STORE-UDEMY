import { Component, OnInit,  Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  toggleValue = true
  @Output() toggleEvent = new EventEmitter<boolean>();

  onToggle() {
    this.toggleValue = !this.toggleValue;
    this.toggleEvent.emit(this.toggleValue);
  }

}
