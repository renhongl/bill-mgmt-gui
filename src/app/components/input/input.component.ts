import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() placeholder = '';
  @Output() handleChange = new EventEmitter();
  @Input() width = '120px';
  @Input() height = '30px';
  @Input() type = 'text';
  @Input() value = '';
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

  callback(e) {
    if (this.disabled) {
      return;
    }
    this.handleChange.next(e);
  }

}
