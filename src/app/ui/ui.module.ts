import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColComponent } from './bootstrap/col/col.component';
import { RowComponent } from './bootstrap/row/row.component';
import { IconComponent } from './interface/icon/icon.component';

@NgModule({
  declarations: [ColComponent, RowComponent, IconComponent],
  imports: [CommonModule],
  exports: [ColComponent, RowComponent, IconComponent]
})
export class UiModule {}
