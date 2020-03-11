import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Output() handleChange = new EventEmitter();
  @Input() total = 0;
  @Input() current = 0;
  @Input() limit = 10;

  maxPage = 0;

  constructor() { }

  ngOnInit() {
    this.maxPage = Math.ceil(this.total / this.limit);
  }

  ngOnChanges(args) {
    this.maxPage = Math.ceil(this.total / this.limit);
    this.total = args.total.currentValue;
  }

  callback(e, type) {
    const target = e.currentTarget;
    target.classList.add('active');
    setTimeout(() => {
      target.classList.remove('active');
      this.handleChange.next(type);
    }, 200);
  }

}
