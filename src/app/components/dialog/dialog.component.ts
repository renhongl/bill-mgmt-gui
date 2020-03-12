import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() width = '200px';
  @Input() height = '200px';

  active = false;

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
