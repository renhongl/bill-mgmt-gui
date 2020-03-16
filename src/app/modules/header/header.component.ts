import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SERVER } from '../../utils/url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('accountRef', {static: true}) accountRef;
  @ViewChild('accountPopver', {static: false}) accountPopver;
  base: any;
  user: any;
  avator: string;
  dark = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.base = this.accountRef.nativeElement;
    this.user = JSON.parse(localStorage.getItem('bill-user'));
    this.avator = SERVER + '/' + this.user.avator;
  }

  ngAfterViewInit() {
    this.base = this.accountRef.nativeElement;
  }

  onClick() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('bill-token');
    localStorage.removeItem('bill-user');
    this.router.navigate(['/login']);
  }

  openAccount(e) {
    this.accountPopver.open(e);
   
  }

  changeTheme(e) {
    this.dark = !this.dark;
    if (this.dark) {
      this.darkTheme();
    } else {
      this.lightTheme();
    }
  }

  darkTheme() {
    document.documentElement.style.setProperty('--bg', '#18191f');
    document.documentElement.style.setProperty('--shadow', '3px 3px 5px #020202, -3px -3px 5px #23252d, -3px -3px 3px #23252d');
  }

  lightTheme() {
    document.documentElement.style.setProperty('--bg', '#fff');
    document.documentElement.style.setProperty('--shadow', '3px 3px 5px #02020236, -3px -3px 5px #a2a2a23b, -3px -3px 3px #efefef30');
  }

}
