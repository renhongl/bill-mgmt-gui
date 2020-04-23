import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from './teacher.service';
import { Success } from '../../types/response';
import { UniversityService } from '../university/university.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  colums = ['ID', '姓名', '学校', '手机'];
  keys = ['id', 'name', 'uni', 'phone'];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = null;
  title = '新增老师';
  uniArr = [];
  sortKey = 'name';
  asc = 1;
  navNameArr = ['老师管理'];
  navPathArr = ['/teacher'];

  constructor(private teaSer: TeacherService, private uniSer: UniversityService) { }

  @ViewChild('message', { static: false }) message;
  @ViewChild('dialogRef', {static: false}) dialogRef;

  ngOnInit() {
    this.search();
    this.getUnis();
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

  getUnis() {
    this.uniSer.searchUni(0, 1000, '', 'address', 1).subscribe((result: Success) => {
      this.uniArr = result.data;
    });
  }

  getUniArr() {
    return this.uniArr.map(item => item.name);
  }

  getUniName() {
    if (!this.current.uni) {
      return '';
    }
    const res = this.uniArr.filter(item => item._id === this.current.uni);
    if (res.length === 0) {
      return '';
    }
    return res[0].name;
  }

  changeUni(value) {
    this.current.uni = this.uniArr.filter(item => item.name === value)[0]._id;
  }

  editRow(row) {
    this.title = '更新老师';
    this.drawer = true;
    this.current = this.getCurrentById(row[0]);
    this.changeUni(row[2]);
  }

  addRow() {
    this.title = '新增老师';
    this.drawer = true;
    this.current = {
      name: '',
      uni: '',
      phone: '',
    };
  }

  changeName(e) {
    this.current.name = e.target.value;
  }

  changePhone(e) {
    this.current.phone = e.target.value;
  }

  submit() {
    if (this.title === '新增老师') {
      this.teaSer.createTeacher(this.current.name, this.current.uni, this.current.phone).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.name}] 成功`, 'success');
          this.current = {
            name: '',
            uni: '',
            phone: '',
          };
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.teaSer.updateTeacher(this.current.id, this.current.name, this.current.uni, this.current.phone).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`更新 [${this.current.name}] 成功`, 'success');
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
    this.teaSer.deleteTeacher(this.current.id).subscribe((result: Success) => {
      if (result.code === 200) {
        this.message.open(`删除 [${this.current.name}] 成功`, 'success');
        this.search();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteRow(row) {
    this.current = this.getCurrentById(row[0]);
    this.changeUni(row[2]);
    this.dialogRef.open();
  }

  search() {
    this.teaSer.searchTeacher(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: any) => {
      if (result.code === 200) {
        this.totalRecords = result.total;
        console.log(JSON.stringify(result.data));
        this.list = result.data.map(item => {
          return {
            name: item.name,
            id: item._id,
            uni: item.uni ? item.uni.name : '[已删除]',
            phone: item.phone,
          };
        });
        console.log(JSON.stringify(this.list));
      }
    });
  }


}
