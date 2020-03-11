import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() items = ['ITEM 1', 'ITEM 2', 'ITEM 3'];
  @Output() handleChange = new EventEmitter();
  @Input() width = '200px';
  @Input() height = '30px';
  @Input() value = '';
  @ViewChild('itemsRef', {static: true}) itemsRef;
  active = false;

  constructor() { }

  ngOnInit() {
    this.handleChange.next(this.value);
    document.addEventListener('click', (e) => {
      this.active = false;
      this.itemsRef.nativeElement.classList.remove('active');
    });
  }

  onClick(e) {
    this.active = true;
    this.itemsRef.nativeElement.classList.add('active');
    e.stopPropagation();
  }

  callback(value, e) {
    this.active = false;
    this.itemsRef.nativeElement.classList.remove('active');
    this.value = value;
    this.handleChange.next(value);
    e.stopPropagation();
  }

}
