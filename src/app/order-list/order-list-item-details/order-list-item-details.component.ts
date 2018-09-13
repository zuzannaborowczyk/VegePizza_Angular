import { Component, OnInit } from '@angular/core';
import {Order} from '../../shared/order';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-order-list-item-details',
  templateUrl: './order-list-item-details.component.html',
  styleUrls: ['./order-list-item-details.component.scss']
})
export class OrderListItemDetailsComponent implements OnInit {

  order: Order;
  sub: Subscription;

  constructor(private readonly orderService: OrderService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(+id).subscribe(res => {this.order = res; alert('test'); });
  }

  changeStatusOfOrderToAccepted() {
    this.order.state = 'Accepted';
    this.sub = this.orderService.changeStatusOfOrder(this.order).subscribe();
  }

  changeStatusOfOrderToSent() {
    this.order.state = 'Sent';
    this.sub = this.orderService.changeStatusOfOrder(this.order).subscribe();
  }

  changeStatusOfOrderToDelivered() {
    this.order.state = 'Delivered';
    this.sub = this.orderService.changeStatusOfOrder(this.order).subscribe();
  }
  navigateToOrderList() {
    this.router.navigate(['order-list']);
  }
}
