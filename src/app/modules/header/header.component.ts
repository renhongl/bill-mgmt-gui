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
  dark = localStorage.getItem('bill-theme') ? localStorage.getItem('bill-theme') : 'dark';

  constructor(private router: Router) { }

  ngOnInit() {
    this.base = this.accountRef.nativeElement;
    this.user = JSON.parse(localStorage.getItem('bill-user'));
    this.avator = SERVER + '/' + this.user.avator;
    if (this.dark === 'dark') {
      this.darkTheme();
    } else {
      this.lightTheme();
    }
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

  changeTheme() {
    if (this.dark === 'dark') {
      this.lightTheme();
      localStorage.setItem('bill-theme', 'light');
      this.dark = 'light';
    } else {
      this.darkTheme();
      localStorage.setItem('bill-theme', 'dark');
      this.dark = 'dark';
    }
  }

  darkTheme() {
    document.documentElement.style.setProperty('--bg', '#18191f');
    document.documentElement.style.setProperty('--bgHover', '#141419');
    document.documentElement.style.setProperty('--default', '#b1b1b1');
    document.documentElement.style.setProperty('--disable', 'rgb(47, 47, 47)');
    document.documentElement.style.setProperty('--shadow', '3px 3px 5px #020202, -3px -3px 5px #23252d, -3px -3px 3px #23252d');
    document.documentElement.style.setProperty('--insetShadow', 'inset 3px 3px 5px #020202, inset -3px -3px 5px #23252d, inset -3px -3px 3px #23252d');
    document.documentElement.style.setProperty('--textShadow', '0 0 2px var(--primary)');
    document.documentElement.style.setProperty('--inputShadow', 'inset 3px 3px 5px var(--primary), inset -1px -1px 3px var(--primary), inset -3px -3px 3px #23252d');
  }

  lightTheme() {
    document.documentElement.style.setProperty('--bg', '#fff');
    document.documentElement.style.setProperty('--bgHover', '#f1f1f1');
    document.documentElement.style.setProperty('--disable', 'rgb(239, 239, 239)');
    document.documentElement.style.setProperty('--default', '#1d1d1d');
    document.documentElement.style.setProperty('--shadow', '0px 0px 2px rgba(0, 0, 0, 0.25)');
    document.documentElement.style.setProperty('--insetShadow', 'inset 0px 0px 2px rgba(0, 0, 0, 0.25)');
    document.documentElement.style.setProperty('--textShadow', '0 0 0px var(--primary)');
    document.documentElement.style.setProperty('--inputShadow', 'none');
  }

}
