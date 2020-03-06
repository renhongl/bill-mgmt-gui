import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() width = '25px';
  @Input() height = '25px';
  @Output() handleChange = new EventEmitter();

  checked = false;

  constructor() { }

  ngOnInit() {
  }

  onClick(e) {
    this.checked = !this.checked;
    const target = e.currentTarget;
    target.classList.toggle('active');
    this.handleChange.next(this.checked);
  }

}
