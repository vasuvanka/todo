import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  links = [
    { label: 'Task Manager', url: '' },
    { label: 'Weather', url: 'weather' },
  ];
  activeLink = this.links[0];
  constructor() {}
}
