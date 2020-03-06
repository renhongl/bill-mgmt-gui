import { NgModule } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { ButtonComponent } from '../components/button/button.component';
import { InputComponent } from '../components/input/input.component';
import { MessageComponent } from '../components/message/message.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CheckboxComponent, CardComponent, ButtonComponent, InputComponent, MessageComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [CheckboxComponent, CardComponent, ButtonComponent, InputComponent, MessageComponent, LoadingComponent]
})
export class CommonCompsModule { }
