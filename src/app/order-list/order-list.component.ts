import { Component, OnInit } from '@angular/core';
import {Order} from '../shared/order';
import {Subscription} from 'rxjs';
import {OrderService} from '../shared/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[];
  sub: Subscription;

  constructor(private readonly orderService: OrderService) { }

  ngOnInit() {
    this.sub = this.orderService.getOrders().subscribe(result => this.orders = result);
  }
}
