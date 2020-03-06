import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

const TeacherRoutes: Routes = [
  {
    path: '',
    component: TeacherComponent,
  }
];

@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TeacherRoutes),
    CommonCompsModule
  ]
})
export class TeacherModule { }
