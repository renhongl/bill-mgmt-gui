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
  teaAllArr = [];
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
    this.getAllTea();
  }

  getAllTea() {
    this.teaSer.searchTeacher(0, 100, '', 'name', 1).subscribe((result: any) => {
      this.teaAllArr = result.data;
    });
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

  changeTeacher(value) {
    if (!value) {
      return '';
    }
    this.current.teacher = this.teaAllArr.filter(item => item.name === value)[0]._id;
  }

  getTeaName() {
    if (!this.current.teacher) {
      return '';
    }
    return this.teaAllArr.filter(item => item._id === this.current.teacher)[0].name;
  }

  getTeaArr() {
    return this.teaArr.map(item => item.name);
  }

  getUniName() {
    if (!this.current.uni) {
      return '';
    }
    return this.uniArr.filter(item => item._id === this.current.uni)[0].name;
  }

  changeUni(value) {
    if (!value) {
      return;
    }
    this.current.uni = this.uniArr.filter(item => item.name === value)[0]._id;
    const old = this.current.teacher;
    this.current.teacher = '';
    this.teaSer.searchTeacherByUni(0, 100, value, 'name', 1).subscribe((result: any) => {
      this.teaArr = result.data;
      let arr = this.teaArr.filter(item => item._id === old);
      if (arr.length !== 0) {
        this.current.teacher = arr[0]._id;
      }
    });
  }

  editRow(row) {
    this.title = '更新学生';
    this.drawer = true;
    this.current = {
      id: row[0],
      name: row[1],
      uni: this.uniArr.filter(item => item.name === row[2])[0]._id,
      teacher: this.teaAllArr.filter(item => item.name === row[3])[0]._id,
      phone: row[4],
    };
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
    if (!this.current.name || !this.current.name.trim()) {
      return this.message.open('学生姓名不能为空', 'error');
    }
    if (!this.current.phone || !this.current.phone.trim()) {
      return this.message.open('手机号码不能为空。', 'error');
    }
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
      } else {
        this.message.open(result.message, 'error');
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteRow(row) {
    this.current = {
      id: row[0],
      name: row[1],
      uni: this.uniArr.filter(item => item.name === row[2])[0]._id,
      teacher: this.teaAllArr.filter(item => item.name === row[3])[0]._id,
      phone: row[4],
    };
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
            uni: item.uni.name,
            teacher: item.teacher.name,
            phone: item.phone,
          };
        });
        console.log(JSON.stringify(this.list));
      }
    });
  }


}
