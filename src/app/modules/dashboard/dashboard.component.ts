import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any;
  trendMonthlyUnichartOption: any;
  trendDaylyUnichartOption: any;
  totalCount: any;
  thisMonthTimeStr: string;
  thisMonthTimeStamp: string;
  topStudent: any;
  topTeacher: any;
  topUni: any;
  trendMonthlyUni: any;
  thisYearTimeStamp: string;
  thisYearTimeStr: string;

  constructor(private router: Router, private dashSer: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('bill-user'));
    const d = new Date();
    // d.setMonth(0);
    d.setDate(1);
    this.thisMonthTimeStamp = d.getTime().toString();
    this.thisMonthTimeStr = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;

    const dYear = new Date();
    dYear.setMonth(0);
    dYear.setDate(1);
    this.thisYearTimeStamp = dYear.getTime().toString();
    this.thisYearTimeStr = `${dYear.getFullYear()}/${dYear.getMonth() + 1}/${dYear.getDate()}`;
  }

  ngOnInit() {
    this.initCharts();

  }

  initCharts() {
    this.initPickupCount();
    this.initTopStudent();
    this.initTopTeacher();
    this.initTopUni();
    this.initTrendMonthlyUni();
    this.initTrendDaylyUni();
  }

  getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getPickedupCount(list) {
    let n = 0;
    for (const item of list) {
      if (item.pickUpTime) {
        n += 1;
      }
    }
    return n;
  }

  initTrendMonthlyUni() {
    this.dashSer.getTrendUniMaterial(this.thisYearTimeStamp, true).subscribe((result: any) => {
      const monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      this.trendMonthlyUnichartOption = this.getOptions(monthes, result.data);
      this.trendMonthlyUnichartOption.xAxis.data = this.trendMonthlyUnichartOption.xAxis.data.map((month) => month + '月');
    });
  }

  initTrendDaylyUni() {
    this.dashSer.getTrendUniMaterial(this.thisMonthTimeStamp, false).subscribe((result: any) => {
      const date = new Date(Number(this.thisMonthTimeStamp));
      const len = this.getDaysInMonth(date.getMonth() + 1, date.getFullYear());
      const days = [];
      for (let i = 1; i <= len; i++) {
        days.push(i);
      }
      this.trendDaylyUnichartOption = this.getOptions(days, result.data);
      this.trendDaylyUnichartOption.xAxis.data = this.trendDaylyUnichartOption.xAxis.data.map((month) => month + '日');
    });
  }

  initTopUni() {
    this.dashSer.getTopUniMaterial(this.thisYearTimeStamp).subscribe((result: any) => {
      this.topUni = {
        name: result.data.name.split('-')[0],
        count: result.data.count,
        pickedUpCount: this.getPickedupCount(result.data.items),
      };
    });
  }

  initTopTeacher() {
    this.dashSer.getTopTeacherMaterial(this.thisYearTimeStamp).subscribe((result: any) => {
      this.topTeacher = {
        name: result.data.name.split('-')[0],
        count: result.data.count,
        pickedUpCount: this.getPickedupCount(result.data.items),
      };
    });
  }

  initTopStudent() {
    this.dashSer.getTopStudentMaterial(this.thisYearTimeStamp).subscribe((result: any) => {
      this.topStudent = {
        name: result.data.name.split('-')[0],
        count: result.data.count,
        pickedUpCount: this.getPickedupCount(result.data.items),
      };
    });
  }

  initPickupCount() {
    this.dashSer.getTotalMaterial(this.thisYearTimeStamp).subscribe((result: any) => {
      if (result.code === 200) {
        this.totalCount = {
          total: result.data.total,
          pickedup: result.data.pickedUp,
          unPickup: result.data.total - result.data.pickedUp,
        };
      } else {
        console.log(result.msg);
      }
    });
  }

  onClick(path: string) {
    this.router.navigate([path]);
  }

  convertChartData(data, xAxisData) {
    return xAxisData.map((i) => data[i] || 0);
  }

  getSeries(data, xAxisData) {
    const keys = Object.keys(data);
    return keys.map((key) => {
      return {
        name: key.split('-')[0],
        type: 'line',
        smooth: true,
        data: this.convertChartData(data[key], xAxisData),
        animationDelay: (idx) => {
          return idx * 10;
        }
      };
    });
  }

  getLengend(data) {
    return Object.keys(data).map((key) => key.split('-')[0]);
  }

  getOptions(x, data) {
    const xAxisData = x || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const color = ['#dd4444', '#fec42c', '#80F1BE'];
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--default');

    return {
      legend: {
        data: this.getLengend(data),
        orient: 'horizontal',
        top: '8%',
        left: '10%',
        textStyle: {
          color: textColor
        }
      },
      color,
      tooltip: {
        show: true,
      },
      xAxis: {
        data: xAxisData,
        silent: false,
        axisLabel: {
          textStyle: {
            show: true,
            color: textColor
          }
        },
        axisPointer: {
          show: true,
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            show: true,
            color: textColor
          }
        },
      },
      series: this.getSeries(data, xAxisData),
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
  }

}
