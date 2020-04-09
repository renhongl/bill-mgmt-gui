import { Component, OnInit, ViewChild } from '@angular/core';
import { UniversityService } from './university.service';
import { Success } from '../../types/response';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  colums = ['ID', '学校名称', '地址'];
  keys = ['id', 'name', 'address'];
  list = [];
  index = 0;
  total = 10;
  searchWord = '';
  totalRecords = 0;
  drawer = false;
  current = null;
  title = '新增学校';
  sortKey = 'name';
  asc = 1;
  navNameArr = ['学校管理'];
  navPathArr = ['/university'];

  constructor(private uniSrc: UniversityService) { }

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
    this.title = '更新学校';
    this.drawer = true;
    this.current = this.getCurrentById(row[0]);
  }

  addRow() {
    this.title = '新增学校';
    this.drawer = true;
    this.current = {
      name: '',
      address: '',
    };
  }

  changeName(e) {
    this.current.name = e.target.value;
  }

  changeAddress(e) {
    this.current.address = e.target.value;
  }

  submit() {
    if (this.title === '新增学校') {
      this.uniSrc.createUni(this.current.name, this.current.address).subscribe((result: Success) => {
        if (result.code === 200) {
          this.message.open(`添加 [${this.current.name}] 成功`, 'success');
          this.current = {
            name: '',
            address: '',
          };
          this.search();
        } else {
          this.message.open(result.message, 'error');
        }
      });
    } else {
      this.uniSrc.updateUni(this.current.id, this.current.name, this.current.address).subscribe((result: Success) => {
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
    this.uniSrc.deleteUni(this.current.id).subscribe((result: Success) => {
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
    this.uniSrc.searchUni(this.index, this.total, this.searchWord, this.sortKey, this.asc).subscribe((result: Success) => {
      if (result.code === 200) {
        this.totalRecords = result['total'];
        console.log(JSON.stringify(result.data));
        this.list = result.data.map(item => {
          return {
            name: item.name,
            id: item._id,
            address: item.address
          };
        });
        console.log(JSON.stringify(this.list));
      }
    });
  }

}
