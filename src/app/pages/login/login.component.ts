import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { Auth } from '../../types/authTypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  @ViewChild('message', { static: false }) message;
  loading = false;
  remember = false;

  constructor(private authSer: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onNameChange(e) {
    this.userName = e.target.value;
  }

  onPasswordChange(e) {
    this.password = e.target.value;
  }

  onRemeberChange(value) {
    this.remember = value;
  }

  login(e) {
    this.loading = true;
    setTimeout(() => {
      this.authSer.login(this.userName, this.password).subscribe((result: Auth) => {
        this.loading = false;
        if (result.code === 200) {
          const token = result.data.token;
          localStorage.setItem('bill-token', token);
          this.message.open('登录成功，1秒后跳转到主页。', 'success');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        } else {
          this.message.open('登录失败，用户名或密码错误。', 'error');
        }
      });
    }, 2000);
  }

}
