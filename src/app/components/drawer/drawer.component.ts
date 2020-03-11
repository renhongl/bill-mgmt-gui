import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  active = false;

  @Input() width = '100px';
  @Input() height = '100px';

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.active = true;
  }

  close() {
    this.active = false;
  }

}
