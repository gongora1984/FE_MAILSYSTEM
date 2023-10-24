import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignOutComponent} from "./sign-out/sign-out.component";
import {LoginFailedComponent} from "./login-failed/login-failed.component";

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent, data: {title: 'Sign In'}},
  {path: 'signed-out', component: SignOutComponent, data: {title: 'Signed Out'}},
  {path: 'login-failed', component: LoginFailedComponent, data: {title: 'LoginDto Failed'}},
  {
    path: '**',
    redirectTo: 'sign-in',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
