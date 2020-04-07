import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() nameArr = ['主页', '材料管理', '学校管理', '老师管理', '学生管理', '账号管理'];
  @Input() iconArr = ['home', 'delete', 'add', 'delete', 'home', 'add'];
  @Input() pathArr = ['/', '/', '/university', '/teacher', '/student', '/account'];
  @Output() handleChange = new EventEmitter();

  @Input() index = 0;

  constructor() { }

  ngOnInit() {
  }

  changeCurrent(i) {
    this.index = i;
    this.handleChange.next(this.pathArr[i]);
  }

}
