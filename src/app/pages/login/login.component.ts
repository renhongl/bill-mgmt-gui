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
  mail: string;
  code: string;
  @ViewChild('message', { static: false }) message;
  loading = false;
  remember = false;
  qr = true;
  register = false;

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

  changeResister() {
    this.register = !this.register;
  }

  changeQr() {
    this.qr = !this.qr;
  }

  onMailChange(e) {
    this.mail = e.target.value;
  }

  onChangeCode(e) {
    this.code = e.target.value;
  }

  getVerifyCode() {
    this.authSer.getCode(this.userName, this.mail).subscribe(result => {
      if (result.code === 200) {
        this.message.open('验证码已发往你的邮箱，请在30分钟内使用。', 'success');
      } else {
        this.message.open(result.message, 'error');
      }
    });
  }

  registerAccount() {
    this.authSer.register(this.userName, this.password, this.mail, this.code).subscribe(result => {
      if (result.code === 200) {
        this.message.open('注册成功，请前往登录。', 'success');
      } else {
        this.message.open(result.message, 'error');
      }
    });
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
