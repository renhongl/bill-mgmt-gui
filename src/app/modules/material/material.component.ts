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

  colums: string[];
  keys: string[];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = {
    id: '',
    content: '',
    price: '',
    student: '',
    uni: '',
    createTime: '',
    pickUpTime: '',
    teacher: '',
    phone: '',
  };
  title = '新增样品';
  uniArr = [];
  teaArr = [];
  sortKey = 'createTime';
  asc = -1;
  navNameArr = ['样品管理'];
  navPathArr = ['/material'];
  currentStudent = null;
  currentTeacher = null;
  currentUni = null;
  user = null;

  constructor(private matSer: MaterialService, private uniSer: UniversityService, private stuSer: StudentService) {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
    if (this.user && this.user.auth !== 0) {
      this.colums = ['ID', '姓名', '内容', '创建时间'];
      this.keys = ['id', 'name', 'content', 'createTimeStr'];
    } else {
      this.colums = ['ID', '姓名', '内容', '电话', '学校', '老师', '价格', '创建时间', '取走时间'];
      this.keys = ['id', 'name', 'content', 'phone', 'uni', 'teacher', 'price', 'createTimeStr', 'pickUpTimeStr'];
    }
  }

  @ViewChild('message', { static: false }) message;
  // @ViewChild('messagePickup', { static: false }) messagePickup;
  @ViewChild('dialogRef', { static: false }) dialogRef;

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

  updatePrice(row) {
    this.matSer.updateMaterialPrice(row[0], row[6]).subscribe((result: any) => {
      if (result.code === 200) {
        this.message.open(`更新 [${row[2]}] 价格 成功`, 'success');
        this.search();
      } else {
        this.message.open(result.message, 'error');
      }
    });
  }

  pickupMat(row) {
    this.searchStudent(row[3], () => {
      this.matSer.updateMaterial(this.current.id, this.current.student, this.current.teacher, this.current.uni, this.current.content, this.current.price, Date.now().toString()).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`更新 [${this.current.content}] 成功`, 'success');
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    });
    this.current.id = row[0];
    this.current.content = row[2];
    this.current.phone = row[3];
    this.current.price = row[6];
  }

  undoPickup(row) {
    this.searchStudent(row[3], () => {
      this.matSer.updateMaterial(this.current.id, this.current.student, this.current.teacher, this.current.uni, this.current.content, this.current.price, '').subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`撤销 [${this.current.content}] 成功`, 'success');
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    });
    this.current.id = row[0];
    this.current.content = row[2];
    this.current.phone = row[3];
    this.current.price = row[6];
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
    this.searchStudent(row[3]);
    this.current.id = row[0];
    this.current.content = row[2];
    this.current.phone = row[3];
    this.current.price = row[6];
  }

  addRow() {
    this.title = '新增样品';
    this.drawer = true;
    this.clearCurrent();
  }

  clearCurrent() {
    this.current.id = '';
    this.current.content = '';
    this.current.price = '';
    this.current.student = '';
    this.current.uni = '';
    this.current.createTime = '';
    this.current.pickUpTime = '';
    this.current.teacher = '';
    this.current.phone = '';
    this.currentStudent = null;
    this.currentTeacher = null;
    this.currentUni = null;
  }

  changeName(e) {}

  changeContent(e) {
    this.current.content = e.target.value;
  }

  changePhone(e) {
    this.current.phone = e.target.value;
    this.searchStudent(e.target.value);
  }

  searchStudent(value, cb?) {
    this.stuSer.searchStudent(0, 10, value, 'name', 1).subscribe((result: any) => {
      const data = result.data;
      if (data.length === 1) {
        this.current.student = data[0]._id,
        this.current.uni = data[0].uni._id;
        this.current.teacher = data[0].teacher._id;
        this.currentStudent = data[0];
        this.currentTeacher = data[0].teacher;
        this.currentUni = data[0].uni;
        if (cb) {
          cb();
        }
      } else {
        this.message.open('该手机号没有记录，请联系管理员。', 'warning');
        this.current.student = '';
        this.current.uni = '';
        this.current.teacher = '';
        this.currentStudent = null;
        this.currentTeacher = null;
        this.currentUni = null;
      }
    });
  }

  getStudentName() {
    if (!this.currentStudent) {
      return '';
    }
    return this.currentStudent.name;
  }

  getTeacherName() {
    if (!this.currentTeacher) {
      return '';
    }
    return this.currentTeacher.name;
  }

  getUniName() {
    if (!this.currentUni) {
      return '';
    }
    return this.currentUni.name;
  }

  changeTeacher(value) {}

  download() {
    const now = Date.now();
    const list = this.list.map((item) => {
      return {
        uni: item.uni,
        teacher: item.teacher,
        name: item.name,
        phone: item.phone,
        content: item.content,
        createTime: item.createTimeStr,
        pickUpTime: item.pickUpTimeStr || '未取走',
        price: item.price,
      };
    });
    this.exportCSVFile({
      uni: '学校',
      teacher: '老师',
      name: '姓名',
      phone: '电话',
      content: '内容',
      createTime: '创建日期',
      pickUpTime: '取走日期',
      price: '价格',
    }, list, now + '');
  }

  convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    const jsonObject = JSON.stringify(items);
    const csv = this.convertToCSV(jsonObject);
    const exportedFilenmae = '报告-' + fileTitle + '.csv' || 'export.csv';
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;\uFEFF' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  submit() {
    if (this.title === '新增样品') {
      this.matSer.createMaterial(this.current.student, this.current.teacher, this.current.uni, this.current.content, this.current.price).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.content}] 成功`, 'success');
          this.clearCurrent();
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.matSer.updateMaterial(this.current.id, this.current.student, this.current.teacher, this.current.uni, this.current.content, this.current.price).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`更新 [${this.current.content}] 成功`, 'success');
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
        this.message.open(`删除 [${this.current.content}] 成功`, 'success');
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

  getDateTimeFormat(date: Date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
  }

  addZero(num) {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  }

  search() {
    this.matSer.searchMaterial(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: any) => {
      if (result.code === 200) {
        this.totalRecords = result.total;
        this.list = result.data.map(item => {
          let createDate = '';
          let pickUpDate = '';
          if (item.createTime) {
            const d = new Date(Number(item.createTime));
            createDate = this.getDateTimeFormat(d);
          }

          if (item.pickUpTime) {
            const d = new Date(Number(item.pickUpTime));
            pickUpDate = this.getDateTimeFormat(d);
          }

          return {
            content: item.content,
            name: item.student.name,
            price: item.price,
            id: item._id,
            createTime: item.createTime,
            createTimeStr: createDate,
            pickUpTime: item.pickUpTime,
            pickUpTimeStr: pickUpDate,
            uni: item.uni.name,
            teacher: item.teacher.name,
            phone: item.student.phone,
          };
        });
      }
    });
  }
}
