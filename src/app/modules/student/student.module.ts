import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

const StudentRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
  }
];

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(StudentRoutes),
    CommonCompsModule
  ]
})
export class StudentModule { }
