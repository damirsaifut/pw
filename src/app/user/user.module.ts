import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomModule } from '../custom/custom.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@NgModule({
  declarations: [SignInComponent, UserRegistrationComponent],
  imports: [CommonModule, UserRoutingModule, CustomModule.forRoot()]
})
export class UserModule {}
