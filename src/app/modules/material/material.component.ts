import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from './material.service';
import { Success } from '../../types/response';
import { UniversityService } from '../university/university.service';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  colums = ['ID', '样品内容', '学生姓名', '学生电话', '学校', '老师', '价格'];
  keys = ['id', 'content', 'name', 'phone', 'uni', 'teacher', 'price'];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = null;
  title = '新增样品';
  uniArr = [];
  teaArr = [];
  sortKey = 'name';
  asc = 1;
  navNameArr = ['样品管理'];
  navPathArr = ['/material'];

  constructor(private matSer: MaterialService, private uniSer: UniversityService, private stuSer: StudentService) { }

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

  getUnis() {
    this.uniSer.searchUni(0, 1000, '', 'address', 1).subscribe((result: Success) => {
      this.uniArr = result.data.map(item => item.name);
    });
  }

  changePrice(e) {
    this.current.price = e.target.value;
  }

  changeUni(value) {
    this.current.uni = value;
  }

  editRow(row) {
    this.title = '更新样品';
    this.drawer = true;
    this.current = this.getCurrentById(row[0]);
  }

  addRow() {
    this.title = '新增样品';
    this.drawer = true;
    this.current = {
      content: '',
      price: '',
      name: '',
      uni: '',
      teacher: '',
      phone: '',
    };
  }

  changeName(e) {
    this.current.name = e.target.value;
  }

  changeContent(e) {
    this.current.content = e.target.value;
  }

  changePhone(e) {
    this.current.phone = e.target.value;
    this.stuSer.searchStudent(0, 10, e.target.value, 'name',  1).subscribe((result: any) => {
      const data = result.data;
      if (data.length === 1) {
        this.current.name = data[0].name;
        this.current.uni = data[0].uni;
        this.current.teacher = data[0].teacher;
      }
    });
  }

  changeTeacher(value) {

  }

  submit() {
    if (this.title === '新增样品') {
      this.matSer.createMaterial(this.current.name, this.current.teacher, this.current.uni, this.current.content, this.current.price, this.current.phone).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.name}] 成功`, 'success');
          this.current = {
            content: '',
            price: '',
            name: '',
            uni: '',
            teacher: '',
            phone: '',
          };
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.matSer.updateMaterial(this.current.id, this.current.teacher, this.current.name, this.current.uni, this.current.content, this.current.price,this.current.phone).subscribe((result: Success) => {
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
    this.matSer.deleteMaterial(this.current.id).subscribe((result: Success) => {
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
    this.dialogRef.open();
  }

  search() {
    this.matSer.searchMaterial(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: Success) => {
      if (result.code === 200) {
        this.totalRecords = result['total'];
        console.log(JSON.stringify(result.data));
        this.list = result.data.map(item => {
          return {
            content: item.content,
            name: item.name,
            price: item.price,
            id: item._id,
            uni: item.uni || null,
            teacher: item.teacher || null,
            phone: item.phone,
          };
        });
        console.log(JSON.stringify(this.list));
      }
    });
  }


}
