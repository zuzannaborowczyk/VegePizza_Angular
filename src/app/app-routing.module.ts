import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {DetailsComponent} from './menu/details/details.component';
import {CartComponent} from './customer/cart/cart.component';
import {AuthGuardService} from './shared/auth-guard.service';
import {AddressformComponent} from './customer/addressform/addressform.component';
import {LoginComponent} from './login/login.component';
import {OrderListComponent} from './order-list/order-list.component';
import {SummaryComponent} from './customer/summary/summary.component';
import {OrderListItemDetailsComponent} from './order-list/order-list-item-details/order-list-item-details.component';
import {OwnerMenuComponent} from './owner-menu/owner-menu.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'dishes/:id', component: DetailsComponent, canActivate: [AuthGuardService]},
  {path: 'myOrders', component: CartComponent},
  {path: 'makeAnOrder', component: AddressformComponent},
  {path: 'login', component: LoginComponent},
  {path: 'order-list', component: OrderListComponent, canActivate: [AuthGuardService]},
  {path: 'summary', component: SummaryComponent},
  {path: 'order-details/:id', component: OrderListItemDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: OwnerMenuComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
