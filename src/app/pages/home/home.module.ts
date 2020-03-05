import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

import { HeaderModule } from '../../modules/header/header.module';

const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'university',
        loadChildren: () => import('../../modules/university/university.module').then(m => m.UniversityModule),
      },
      {
        path: 'teacher',
        loadChildren: () => import('../../modules/teacher/teacher.module').then(m => m.TeacherModule),
      },
      {
        path: 'student',
        loadChildren: () => import('../../modules/student/student.module').then(m => m.StudentModule),
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    HeaderModule,
  ]
})
export class HomeModule { }
