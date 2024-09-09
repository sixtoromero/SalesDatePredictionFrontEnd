import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesdateRoutingModule } from './salesdate-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { OrdersDialogComponent } from './pages/orders-dialog/orders-dialog.component';
import { OrderNewDialogComponent } from './pages/order-new-dialog/order-new-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    OrdersDialogComponent,
    OrderNewDialogComponent
  ],
  imports: [
    CommonModule,
    SalesdateRoutingModule,
    MaterialModule,
    NgxUiLoaderModule,
    ReactiveFormsModule
  ]
})
export class SalesdateModule { }