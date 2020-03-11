import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() active = false;

  constructor() { }

  ngOnInit() {
    
  }

  handleClick(e) {
    if (this.active) {
      e.stopPropagation();
    }
  }

}
