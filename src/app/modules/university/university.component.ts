import { Component, OnInit } from '@angular/core';
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

  list = [
    // {
    //   id: '001',
    //   name: "江汉大学",
    //   address: '湖北省武汉市',
    // },
    // {
    //   id: '002',
    //   name: "武汉大学",
    //   address: '湖北省武汉市',
    // },
    // {
    //   id: '003',
    //   name: "清华大学",
    //   address: '北京市',
    // },
    // {
    //   id: '004',
    //   name: "北京大学",
    //   address: '北京市',
    // },
    // {
    //   id: '001',
    //   name: "江汉大学",
    //   address: '湖北省武汉市',
    // },
    // {
    //   id: '002',
    //   name: "武汉大学",
    //   address: '湖北省武汉市',
    // },
    // {
    //   id: '003',
    //   name: "清华大学",
    //   address: '北京市',
    // },
    // {
    //   id: '004',
    //   name: "北京大学",
    //   address: '北京市',
    // },
    // {
    //   id: '003',
    //   name: "清华大学",
    //   address: '北京市',
    // },
    // {
    //   id: '004',
    //   name: "北京大学",
    //   address: '北京市',
    // }
  ]

  constructor(private uniSrc: UniversityService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.uniSrc.getAllUni().subscribe((result: Success) => {
      if (result.code === 200) {
        this.list = result.data.map(item => {
          return {
            name: item.name,
            id: item._id,
            address: 'null'
          }
        })
      }
    });
  }

}
