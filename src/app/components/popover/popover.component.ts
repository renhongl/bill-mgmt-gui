import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  @Input() base;
  @Input() width = '200px';
  @Input() height = '200px';
  @ViewChild('popoverRef', {static: false}) popoverRef;
  target = null;
  left = 0;
  top = 0;
  active = false;
  unit = 'px';
  wid = 0;
  hei = 0;

  constructor() { }

  ngOnInit() {
    if (this.width.indexOf('px') === -1) {
      this.unit = '%';
    }
    this.wid = Number.parseInt(this.width, 10);
    this.hei = Number.parseInt(this.height, 10);
    this.target = this.base.getBoundingClientRect();
    const clientW = document.body.clientWidth;
    if (clientW < this.target.x + this.wid) {
      this.left = clientW - this.wid - 20;
    } else {
      this.left = this.target.x;
    }
    this.top = this.target.y + this.target.height + 30;
    document.body.addEventListener('click', (e) => {
      this.active = false;
      this.popoverRef.nativeElement.classList.remove('active');
    });
  }

  open(e) {
    this.active = true;
    e.stopPropagation();
  }

  close(e) {
    this.active = false;
    e.stopPropagation();
  }

  onClick(e) {
    e.stopPropagation();
  }

}
