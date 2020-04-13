import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';
import { NgxEchartsModule } from 'ngx-echarts';

const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    CommonCompsModule,
    NgxEchartsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
