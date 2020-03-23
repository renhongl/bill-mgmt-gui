import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() src = '/gui/assets/images/user.png';
  @Output() handleChange = new EventEmitter();
  @Input() width = '80px';
  @Input() height = '80px';

  constructor() { }

  ngOnInit() {
  }

  onChange(e) {
    this.handleChange.next(e);
  }

}
