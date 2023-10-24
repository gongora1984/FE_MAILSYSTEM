import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginFailedComponent } from './login-failed/login-failed.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignOutComponent } from './sign-out/sign-out.component';
import {AppMaterialModule} from "../../app-material.module";


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    LoginFailedComponent,
    SignOutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule
  ],
  providers:[

  ]
})
export class AuthModule { }
