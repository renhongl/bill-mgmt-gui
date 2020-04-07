import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bill-mgmt-gui';

  ngOnInit() {
    fetch('../assets/config/server.json').then(res => {
      res.json().then(config => {
        localStorage.setItem('bill-server', config.server);
      });
    });
  }
}
