import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from './account.service';
import { SERVER } from '../../utils/url';
import { Success } from 'src/app/types/response';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  items = ['主页', '账号'];
  path = ['/', '/account'];
  avator = JSON.parse(localStorage.getItem('bill-user')).avator;
  src = SERVER + '/' + JSON.parse(localStorage.getItem('bill-user')).avator;
  user = null;
  @ViewChild('message', {static: false}) message;

  constructor(private accSer: AccountService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
  }

  changeAvator(e) {
    const file = e.target.files[0];
    this.accSer.uploadFile(file, 'avator').subscribe((result: any) => {
      this.avator = result.imagePath;
      this.src = SERVER + '/' + result.imagePath;
    });
  }

  saveAccount() {
    const user = {
      avator: this.avator,
    };
    this.accSer.updateAccount(user).subscribe((result: Success) => {
      if (result.code === 200) {
        this.message.open('更新账号成功', 'success');
        this.accSer.getUser().subscribe((result: Success) => {
          this.avator = result.data.avator;
          this.src = SERVER + '/' + result.data.avator;
          localStorage.setItem('bill-user', JSON.stringify(result.data));
        });
      }
    });
  }

}
