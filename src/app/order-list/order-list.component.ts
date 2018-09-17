import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../shared/order';
import {Subject} from 'rxjs';
import {OrderService} from '../shared/order.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getOrders().pipe(takeUntil(this.destroy$)).subscribe(result => this.orders = result);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
