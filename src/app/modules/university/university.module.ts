import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversityComponent } from './university.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

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
    CommonCompsModule
  ],
  exports: [UniversityComponent]
})
export class UniversityModule { }
