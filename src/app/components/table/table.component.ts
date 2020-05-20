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
  @Output() saveUpdate ? = new EventEmitter();
  user: any;

  list: any;

  prevent = false;
  timer = null;
  editIndex = -1;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
    document.body.addEventListener('click', (e: any) => {
      if (this.editIndex !== -1) {
        if (e.target.getAttribute('type') !== 'text') {
          if (Number.isNaN(Number(this.list[this.editIndex][6]))) {
            return this.saveUpdate.next(null);
          }
          this.saveUpdate.next(this.list[this.editIndex]);
          this.editIndex = -1;
        }
      }
    });
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

  doClickAction(e) {
    e.stopPropagation();
  }
  doDoubleClickAction(item) {
    this.list.forEach((one, index) => {
      if (one[0] === item[0]) {
        this.editIndex = index;
      }
    });
  }

  editPriceClick(e) {
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        this.doClickAction(e);
      }
      this.prevent = false;
    }, 500);
  }

  editPriceDblClick(item) {
    clearTimeout(this.timer);
    this.prevent = true;
    this.doDoubleClickAction(item);
  }

  changePrice(e) {
    this.list[this.editIndex][6] = e.target.value;
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
