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
    document.documentElement.style.setProperty('--bgHover', '#141419');
    document.documentElement.style.setProperty('--default', '#b1b1b1');
    document.documentElement.style.setProperty('--shadow', '3px 3px 5px #020202, -3px -3px 5px #23252d, -3px -3px 3px #23252d');
    document.documentElement.style.setProperty('--insetShadow', 'inset 3px 3px 5px #020202, inset -3px -3px 5px #23252d, inset -3px -3px 3px #23252d');
    document.documentElement.style.setProperty('--textShadow', '0 0 2px var(--primary)');
    document.documentElement.style.setProperty('--inputShadow', 'inset 3px 3px 5px var(--primary), inset -1px -1px 3px var(--primary), inset -3px -3px 3px #23252d');
  }

  lightTheme() {
    document.documentElement.style.setProperty('--bg', '#f3f0f1');
    document.documentElement.style.setProperty('--bgHover', '#f3f0f1');
    document.documentElement.style.setProperty('--default', '#b1b1b1');
    document.documentElement.style.setProperty('--shadow', '-6px -6px 10px rgba(255, 255, 255, 0.8), 6px 6px 10px rgba(0, 0, 0, 0.2)');
    document.documentElement.style.setProperty('--insetShadow', 'inset -4px -4px 8px rgba(255, 255, 255, 0.5), inset 8px 8px 16px rgba(0, 0, 0, 0.1)');
    document.documentElement.style.setProperty('--textShadow', '0 0 2px var(--primary)');
    document.documentElement.style.setProperty('--inputShadow', 'none');
  }

}
