import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {

  list = [
    {
      name: "江汉大学",
      address: '湖北省武汉市',
    },
    {
      name: "武汉大学",
      address: '湖北省武汉市',
    },
    {
      name: "清华大学",
      address: '北京市',
    },
    {
      name: "北京大学",
      address: '北京市',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
