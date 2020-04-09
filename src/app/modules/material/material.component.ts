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

  colums = ['ID', '姓名', '内容', '电话', '学校', '老师', '价格', '创建时间', '取走时间'];
  keys = ['id', 'name', 'content', 'phone', 'uni', 'teacher', 'price', 'createTimeStr', 'pickUpTimeStr'];
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
  @ViewChild('dialogRef', { static: false }) dialogRef;

  ngOnInit() {
    this.search();
    // setTimeout(() => {
    //   this.jsonToCSVConvertor(this.list, 'Report', true);
    // }, 5000);
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

  pickupMat(row) {
    this.matSer.updateMaterial(row[0], row[1], row[5], row[4], row[2], row[6], row[3], Date.now().toString()).subscribe((result: Success) => {
      if (result.code === 200) {
        this.message.open(`更新 [${row[1]}] 成功`, 'success');
        this.search();
      } else {
        this.message.open(result.message, 'error');
      }
    });
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
      createTime: '',
      pickUpTime: '',
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
    this.stuSer.searchStudent(0, 10, e.target.value, 'name', 1).subscribe((result: any) => {
      const data = result.data;
      if (data.length === 1) {
        this.current.name = data[0].name;
        this.current.uni = data[0].uni;
        this.current.teacher = data[0].teacher;
      } else {
        this.message.open('该手机号没有记录，请联系管理员。', 'warning');
      }
    });
  }

  changeTeacher(value) {

  }

  download() {
    const now = Date.now();
    this.jsonToCSVConvertor(this.list, now, true);
  }

  jsonToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    const arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = 'sep=,' + '\r\n\n';
    if (ShowLabel) {
      let row = '';
      for (let index in arrData[0]) {
        row += index + ',';
      }

      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }

    for (let i = 0; i < arrData.length; i++) {
      let row = '';
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert('无效的数据。');
      return;
    }

    let fileName = '报告_';
    fileName += ReportTitle.replace(/ /g, '_');

    // let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    const uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV);

    const link: any = document.createElement('a');
    link.href = uri;
    link.style = 'visibility:hidden';
    link.download = fileName + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            createTime: '',
            pickUpTime: '',
            teacher: '',
            phone: '',
          };
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.matSer.updateMaterial(this.current.id, this.current.name, this.current.teacher, this.current.uni, this.current.content, this.current.price, this.current.phone).subscribe((result: Success) => {
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
    this.matSer.searchMaterial(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: any) => {
      if (result.code === 200) {
        this.totalRecords = result.total;
        this.list = result.data.map(item => {
          let createDate = '';
          let pickUpDate = '';
          if (item.createTime) {
            const d = new Date(Number(item.createTime));
            createDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
          }

          if (item.pickUpTime) {
            const d = new Date(Number(item.pickUpTime));
            pickUpDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
          }

          return {
            content: item.content,
            name: item.name,
            price: item.price,
            id: item._id,
            createTime: item.createTime,
            createTimeStr: createDate,
            pickUpTime: item.pickUpTime,
            pickUpTimeStr: pickUpDate,
            uni: item.uni || null,
            teacher: item.teacher || null,
            phone: item.phone,
          };
        });
      }
    });
  }


}
