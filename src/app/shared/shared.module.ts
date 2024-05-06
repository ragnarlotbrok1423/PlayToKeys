import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrangeTextBoxComponent } from './components/orange-text-box/orange-text-box.component';

@NgModule({
  declarations: [OrangeTextBoxComponent, ],
  imports: [
    CommonModule
  ],
  exports: [OrangeTextBoxComponent, ]
})
export class SharedModule { }
