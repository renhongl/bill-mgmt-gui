import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.base = this.accountRef.nativeElement;
    this.user = JSON.parse(localStorage.getItem('bill-user'));
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

}
