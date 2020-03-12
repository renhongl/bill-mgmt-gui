import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

const AccountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
  }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    CommonCompsModule,
  ]
})
export class AccountModule { }
