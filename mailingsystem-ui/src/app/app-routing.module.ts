import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {RoutingGuard} from "./guards/canactivate.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [RoutingGuard],
  },
  {
    path: 'account', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [RoutingGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
