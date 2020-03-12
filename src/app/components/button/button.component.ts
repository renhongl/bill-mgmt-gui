import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() type = 'rect';
  @Input() width = '30px';
  @Input() height = '30px';
  @Output() handleClick = new EventEmitter();
  @Input() color = 'default';

  constructor() {
  }

  ngOnInit() {
  }

  down(e) {
    const target = e.currentTarget;
    target.classList.add('active');
  }

  up(e) {
    const target = e.currentTarget;
    target.classList.remove('active');
    this.handleClick.next(e);
  }

}
