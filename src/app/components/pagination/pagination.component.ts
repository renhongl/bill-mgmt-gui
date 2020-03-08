import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() handleChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
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
