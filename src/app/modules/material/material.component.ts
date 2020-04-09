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
    const list = this.list.map((item) => {
      return {
        content: item.content,
        name: item.name,
        phone: item.phone,
        createTime: item.createTimeStr,
        pickUpTime: item.pickUpTimeStr || '未取走',
        uni: item.uni,
        teacher: item.teacher,
        price: item.price,
      }
    });
    this.exportCSVFile({
      content: '内容', 
      name: '姓名', 
      phone: '电话',
      createTime: '创建日期', 
      pickUpTime: '取走日期', 
      uni: '学校',
      teacher: '老师',
      price: '价格', 
    }, list, now + '');
  }

  convertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
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

    // Convert Object to JSON
    let jsonObject = JSON.stringify(items);

    let csv = this.convertToCSV(jsonObject);

    let exportedFilenmae = '报告-' + fileTitle + '.csv' || 'export.csv';

    let blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;\uFEFF' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
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
