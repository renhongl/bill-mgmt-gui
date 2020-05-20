import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() position = 'top right';
  @Input() delay = 4000;
  @ViewChild('message', { static: true }) message;
  msg = '';
  type = 'success';
  timer = null;
  @Output() undoHandle ? = new EventEmitter();
  @Input() showUndo = false;

  constructor() { }

  ngOnInit() {
    const message = this.message.nativeElement;
    message.addEventListener('mouseenter', (e) => {
      clearTimeout(this.timer);
    });
    message.addEventListener('mouseout', (e) => {
      this.hide();
    });
  }

  undo() {
    this.undoHandle.next();
  }

  open(msg: string, type: string) {
    if (this.timer) {
      const message = this.message.nativeElement;
      const [p1, p2] = this.position.split(' ');
      message.style[p2] = '-100%';
      clearTimeout(this.timer);
      this.timer = null;
    };
    this.msg = msg;
    this.type = type;
    const [p1, p2] = this.position.split(' ');
    const message = this.message.nativeElement;
    message.style[p2] = 0;
    this.hide();
  }

  hide() {
    const message = this.message.nativeElement;
    this.timer = setTimeout(() => {
      const [p1, p2] = this.position.split(' ');
      message.style[p2] = '-100%';
      this.timer = null;
    }, this.delay);
  }

}
