import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent implements OnInit {

  @Input() active = false;

  constructor() { }

  ngOnInit() {
  }

}
