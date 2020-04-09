import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Success } from '../../types/response';
import { UniversityService } from '../university/university.service';
import { TeacherService } from '../teacher/teacher.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  colums = ['ID', '姓名', '学校', '老师', '手机'];
  keys = ['id', 'name', 'uni', 'teacher', 'phone'];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = null;
  title = '新增学生';
  uniArr = [];
  teaArr = [];
  sortKey = 'name';
  asc = 1;
  navNameArr = ['学生管理'];
  navPathArr = ['/student'];

  constructor(private studentSer: StudentService, private uniSer: UniversityService, private teaSer: TeacherService) { }

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
      this.uniArr = result.data.map(item => item.name);
    });
  }

  changeTeacher(value) {
    this.current.teacher = value;
  }

  changeUni(value) {
    this.current.uni = value;
    this.current.teacher = '';
    this.teaSer.searchTeacher(0, 100, value, 'name', 1).subscribe((result: any) => {
      this.teaArr = result.data.map(item => item.name);
    });
  }

  editRow(row) {
    this.title = '更新学生';
    this.drawer = true;
    this.current = this.getCurrentById(row[0]);
  }

  addRow() {
    this.title = '新增学生';
    this.drawer = true;
    this.current = {
      name: '',
      uni: '',
      teacher: '',
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
    if (this.title === '新增学生') {
      this.studentSer.createStudent(this.current.name, this.current.uni, this.current.teacher, this.current.phone).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.name}] 成功`, 'success');
          this.current = {
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
      this.studentSer.updateStudent(this.current.id, this.current.name, this.current.uni, this.current.teacher, this.current.phone).subscribe((result: Success) => {
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
    this.studentSer.deleteStudent(this.current.id).subscribe((result: Success) => {
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
    this.studentSer.searchStudent(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: Success) => {
      if (result.code === 200) {
        this.totalRecords = result['total'];
        console.log(JSON.stringify(result.data));
        this.list = result.data.map(item => {
          return {
            name: item.name,
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
