import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type = 'rect';
  @Input() width = '50px';
  @Input() height = '50px';
  @Output() handleClick = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  callback(e) {
    const target = e.currentTarget;
    target.classList.add('active');
    setTimeout(() => {
      target.classList.remove('active');
      this.handleClick.next(e);
    }, 200);
  }

}
