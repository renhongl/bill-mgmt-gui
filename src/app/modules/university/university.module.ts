import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversityComponent } from './university.component';
import { RouterModule, Routes } from '@angular/router';

const UniversityRoutes: Routes = [
  {
    path: '',
    component: UniversityComponent,
  }
];

@NgModule({
  declarations: [UniversityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UniversityRoutes),
  ],
  exports: [UniversityComponent]
})
export class UniversityModule { }
