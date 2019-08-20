import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { CustomModule } from '../custom/custom.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionComponent } from '../_modal/create-transaction/create-transaction.component';

@NgModule({
  declarations: [TransactionsComponent, CreateTransactionComponent],
  imports: [CommonModule, MainRoutingModule, CustomModule.forRoot()],
  entryComponents: [CreateTransactionComponent]
})
export class MainModule {}
