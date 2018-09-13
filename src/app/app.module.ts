import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import {HttpClientModule} from '@angular/common/http';
import { OwnerMenuComponent } from './owner-menu/owner-menu.component';
import { MenuComponent } from './menu/menu.component';
import { DetailsComponent } from './menu/details/details.component';
import { CartComponent } from './customer/cart/cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuardService} from './shared/auth-guard.service';
import { AddressformComponent } from './customer/addressform/addressform.component';
import { LoginComponent } from './login/login.component';
import { OrderListComponent } from './order-list/order-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { OrderListItemComponent } from './order-list/order-list-item/order-list-item.component';
import { SummaryComponent } from './customer/summary/summary.component';
import { OrderListItemDetailsComponent } from './order-list/order-list-item-details/order-list-item-details.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    OwnerMenuComponent,
    MenuComponent,
    DetailsComponent,
    CartComponent,
    AddressformComponent,
    LoginComponent,
    OrderListComponent,
    OrderListItemComponent,
    SummaryComponent,
    OrderListItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
