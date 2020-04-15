import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bill-mgmt-gui';
  dark = localStorage.getItem('bill-theme') ? localStorage.getItem('bill-theme') : 'dark';

  ngOnInit() {
    if (this.dark === 'dark') {
      this.darkTheme();
    } else {
      this.lightTheme();
    }

    fetch('/gui/assets/config/server.json').then(res => {
      res.json().then(config => {
        localStorage.setItem('bill-server', config.server);
      });
    });
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
