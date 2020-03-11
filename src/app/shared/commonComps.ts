import { NgModule } from '@angular/core';
import { CardComponent } from '../components/card/card.component';
import { ButtonComponent } from '../components/button/button.component';
import { InputComponent } from '../components/input/input.component';
import { MessageComponent } from '../components/message/message.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { TabsComponent } from '../components/tabs/tabs/tabs.component';
import { TabPanelComponent } from '../components/tabs/tab-panel/tab-panel.component';
import { DrawerComponent } from '../components/drawer/drawer.component';

@NgModule({
  declarations: [
    DrawerComponent,
    TabPanelComponent,
    TabsComponent,
    PaginationComponent,
    TableComponent,
    CheckboxComponent,
    CardComponent,
    ButtonComponent,
    InputComponent,
    MessageComponent,
    LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DrawerComponent,
    TabPanelComponent,
    TabsComponent,
    PaginationComponent,
    TableComponent,
    CheckboxComponent,
    CardComponent,
    ButtonComponent,
    InputComponent,
    MessageComponent,
    LoadingComponent]
})
export class CommonCompsModule { }
