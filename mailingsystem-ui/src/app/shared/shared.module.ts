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
import { SideBarComponent } from './components/navigation/side-bar/side-bar.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import {SimpleContainerComponent} from "./components/simple-container/simple-container.component";
import { HeaderComponent } from './components/navigation/header/header.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoadingComponent,
    GobackComponent,
    ConfirmDialogComponent,
    CollasableContainerComponent,
    SimpleContainerComponent,
    SideBarComponent,
    FooterComponent,
    HeaderComponent
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
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
