import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent} from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }
];

@NgModule({
  declarations: [DashboardComponent, CardComponent, ButtonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
