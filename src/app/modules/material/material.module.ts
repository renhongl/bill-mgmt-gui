import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCompsModule } from '../../shared/commonComps';

const MaterialRoutes: Routes = [
  {
    path: '',
    component: MaterialComponent,
  }
];

@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    CommonCompsModule
  ]
})
export class MaterialModule { }
