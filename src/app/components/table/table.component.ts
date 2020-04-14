import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() colums = ["t1", "t2", "t3"];
  @Input() keys = ['aaa', 'bbb', 'ccc'];
  @Input() data = [
    {
      t1: "aaa",
      t2: 'bbb',
      t3: 'ccc'
    },
    {
      t1: "aaa",
      t2: 'bbb',
      t3: 'ccc'
    },
    {
      t1: "aaa",
      t2: 'bbb',
      t3: 'ccc'
    }
  ];
  @Input() delete = true;
  @Input() edit = true;
  @Input() asc = 1;
  @Input() sortKey = '';
  @Output() handleEdit = new EventEmitter();
  @Output() handleDelete = new EventEmitter();
  @Output() handleSort = new EventEmitter();
  @Output() pickupMat ? = new EventEmitter();
  @Output() undoPickup ? = new EventEmitter();
  user: any;

  list: any;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
  }

  ngOnInit() {
    this.list = this.getList();
  }

  ngOnChanges() {
    this.list = this.getList();
  }

  sortBack(value) {
    this.handleSort.next(value.replace('Str', ''));
  }

  getList() {
    const res = [];
    this.data.forEach((item) => {
      const row = [];
      this.keys.forEach((key) => {
        row.push(item[key]);
      });
      res.push(row);
    });
    return res;
  }

  editRow(value) {
    console.log('edit' + value);
    this.handleEdit.next(value);
  }

  deleteRow(value) {
    console.log('delete' + value);
    this.handleDelete.next(value);
  }

  pickup(value) {
    this.pickupMat.next(value);
  }

  undo(value) {
    this.undoPickup.next(value);
  }

}
