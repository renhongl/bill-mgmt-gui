import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: null;
  chartOption: any;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
  }

  ngOnInit() {
    this.initChart();
  }

  onClick(path: string) {
    this.router.navigate([path]);
  }

  initChart() {
    const xAxisData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const data1 = [54, 23, 76, 9, 0, 0, 0, 0, 0, 0, 0, 0];
    const data2 = [76, 92, 55, 12, 0, 0, 0, 0, 0, 0, 0, 0];

    this.chartOption = {
      legend: {
        data: ['李伟', '张强'],
        align: 'top'
      },
      color: [
        '#dd4444', '#fec42c', '#80F1BE'
      ],
      tooltip: {
        show: true,
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        axisPointer: {
          show: true,
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: '李伟',
        type: 'line',
        smooth: true,
        data: data1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: '张强',
        type: 'line',
        smooth: true,
        data: data2,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }

}
