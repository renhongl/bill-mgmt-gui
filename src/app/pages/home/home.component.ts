import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nameArr: string[];
  iconArr: string[];
  pathArr: string[];
  index = 0;
  timer = 1000 * 60 * 25;
  // timer = 5000;

  constructor(private router: Router, private authSer: AuthService) {
    const user = JSON.parse(localStorage.getItem('bill-user'));
    if (user && user.auth !== 0) {
      this.nameArr = ['材料管理', '账号管理'];
      this.iconArr = ['assignment', 'person'];
      this.pathArr = ['/material', '/account'];
      this.router.navigate(['/material']);
    } else {
      this.nameArr = ['数据统计', '材料管理', '学校管理', '老师管理', '学生管理', '账号管理', '用户管理'];
      this.iconArr = ['home', 'assignment', 'account_balance', 'how_to_reg', 'face', 'person', 'people'];
      this.pathArr = ['/', '/material', '/university', '/teacher', '/student', '/account', '/user'];
    }
    this.keepAlive();
  }

  keepAlive() {
    setTimeout(() => {
      this.authSer.keepAlive().subscribe((result: any) => {
        console.log(result);
        localStorage.setItem('bill-token', result.data.token);
        this.keepAlive();
      });
    }, this.timer);
  }

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
