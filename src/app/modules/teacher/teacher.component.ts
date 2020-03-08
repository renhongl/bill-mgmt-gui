import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  colums = ['ID', '姓名', '学校', '手机'];

  keys = ['id', 'name', 'uni', 'phone'];

  list = [
    {
      id: '001',
      name: "孙悟空",
      uni: '江汉大学',
      phone: '343113231',
    },
    {
      id: '002',
      name: "猪八戒",
      uni: '武汉大学',
      phone: '231131',
    },
    {
      id: '003',
      name: "沙森",
      uni: '清华大学',
      phone: '1213242',
    },
    {
      id: '004',
      name: "唐僧",
      uni: '北京大学',
      phone: '112314342',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onEdit(item) {
  }

}
