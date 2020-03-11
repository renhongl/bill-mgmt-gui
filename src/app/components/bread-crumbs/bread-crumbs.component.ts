import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {

  @Input() items = ['NAV ONE', 'NAV TWO'];
  @Input() path = ['/one', '/two'];
  @Input() current = 1;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleClick(index) {
    this.router.navigate([this.path[index]]);
  }

}
