import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nameArr = ['主页', '材料管理', '学校管理', '老师管理', '学生管理', '账号管理'];
  iconArr = ['home', 'delete', 'add', 'delete', 'home', 'add'];
  pathArr = ['/', '/test', '/university', '/teacher', '/student', '/account'];
  index = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    this.index = this.pathArr.indexOf(this.router.url);
    this.router.events.subscribe((result: any) => {
      if (result.url) {
        this.index = this.pathArr.indexOf(result.url);
        console.log(this.index);
      }
    });
  }

  changePage(path) {
    this.router.navigate([path]);
  }

}
