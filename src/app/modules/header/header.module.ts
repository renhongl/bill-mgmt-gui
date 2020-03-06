import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CommonCompsModule } from '../../shared/commonComps';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CommonCompsModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
