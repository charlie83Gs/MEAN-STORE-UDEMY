import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  showSidebar = true;
  toggleSidebar($event){
    this.showSidebar = $event;
  }

}
