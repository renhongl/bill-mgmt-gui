import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

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
