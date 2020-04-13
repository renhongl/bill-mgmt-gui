import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { Success } from '../../types/response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  colums = ['ID', '用户名', '角色', '邮箱', '创建日期'];
  keys = ['id', 'username', 'roleStr', 'mail', 'createDate'];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = null;
  title = '新增用户';
  sortKey = 'createDate';
  asc = 1;
  navNameArr = ['用户管理'];
  navPathArr = ['/user'];
  authArr = ['管理员', '超级管理员'];

  constructor(private uniSrc: UserService) {
    
  }

  @ViewChild('message', { static: false }) message;
  @ViewChild('dialogRef', {static: false}) dialogRef;

  ngOnInit() {
    this.search();
  }

  changeSortKey(value) {
    if (value === this.sortKey) {
      this.asc = -(this.asc);
    } else {
      this.sortKey = value;
      this.asc = 1;
    }
    this.search();
  }

  editRow(row) {
    this.title = '更新用户';
    this.drawer = true;
    this.current = this.getCurrentById(row[0]);
  }

  addRow() {
    this.title = '新增用户';
    this.drawer = true;
    this.current = {
      username: '',
      mail: '',
      password: '',
      role: 1,
      roleStr: '管理员'
    };
  }

  changeName(e) {
    this.current.username = e.target.value;
  }

  changeAuth(value) {
    if (value === this.authArr[0]) {
      this.current.role = 1;
    } else {
      this.current.role = 0;
    }
  }

  changePassword(e) {
    this.current.password = e.target.value;
  }

  changeAddress(e) {
    this.current.mail = e.target.value;
  }

  getAuth(auth) {
    if (auth === 0) {
      return '超级管理员';
    }
    return '管理员';
  }

  submit() {
    if (this.title === '新增用户') {
      this.uniSrc.createUser(this.current.username, this.current.mail, this.current.password, this.current.role).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.username}] 成功`, 'success');
          this.current = {
            username: '',
            mail: '',
            password: '',
            role: 1,
            roleStr: '管理员'
          };
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.uniSrc.updateUser(this.current.id, this.current.username, this.current.mail, this.current.password, this.current.role).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`更新 [${this.current.username}] 成功`, 'success');
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    }
    this.close();
  }

  getCurrentById(id: string) {
    return this.list.filter(item => item.id === id)[0];
  }

  close() {
    this.drawer = false;
  }

  changeSearchWord(e) {
    this.searchWord = e.target.value;
    this.search();
  }

  pageChange(nextPage) {
    if (nextPage) {
      if ((this.index + 1) * this.total > this.totalRecords) {
        return;
      }
      this.index++;
      this.search();
    } else {
      if (this.index === 0) {
        return;
      }
      this.index--;
      this.search();
    }
  }

  confirmDelete() {
    this.dialogRef.close();
    this.uniSrc.deleteUser(this.current.id).subscribe((result: Success) => {
      if (result.code === 200) {
        this.message.open(`删除 [${this.current.username}] 成功`, 'success');
        this.search();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteRow(row) {
    this.current = this.getCurrentById(row[0]);
    this.dialogRef.open();
  }

  addZero(num) {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  }

  getDateTimeFormat(date: Date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
  }

  search() {
    this.uniSrc.searchUser(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: any) => {
      if (result.code === 200) {
        this.totalRecords = result.total;
        console.log(JSON.stringify(result.data));
        this.list = result.data.map(item => {
          let createDate = '';
          if (item.createDate) {
            const d = new Date(Number(item.createDate));
            createDate = this.getDateTimeFormat(d);
          }
          return {
            username: item.username,
            id: item._id,
            mail: item.mail,
            password: item.password,
            role: item.auth,
            roleStr: this.getAuth(item.auth),
            createDate,
          };
        });
        console.log(JSON.stringify(this.list));
      }
    });
  }

}
