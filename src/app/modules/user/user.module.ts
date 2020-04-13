import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
  }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    CommonCompsModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
