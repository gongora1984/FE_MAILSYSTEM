import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AppMaterialModule} from "../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { LoadingComponent } from './components/loading/loading.component';
import { GobackComponent } from './components/goback/goback.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CoreComponent } from './components/core/core.component';
import { CollasableContainerComponent } from './components/collasable-container/collasable-container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/navigation/header/header.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoadingComponent,
    GobackComponent,
    ConfirmDialogComponent,
    CollasableContainerComponent,
    NavigationComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppMaterialModule,
  ]
})
export class SharedModule {
}
