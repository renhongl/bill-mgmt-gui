import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';

import { RouterModule, Routes } from '@angular/router';

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
  ]
})
export class StudentModule { }
