import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/order';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-order-list-item-details',
  templateUrl: './order-list-item-details.component.html',
  styleUrls: ['./order-list-item-details.component.scss']
})
export class OrderListItemDetailsComponent implements OnInit, OnDestroy {

  order: Order;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly orderService: OrderService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrder(+id).pipe(takeUntil(this.destroy$)).subscribe(res => {this.order = res; alert('test'); });
  }

  changeStatusOfOrderToAccepted() {
    this.order.state = 'Accepted';
    this.orderService.changeStatusOfOrder(this.order).subscribe();
  }

  changeStatusOfOrderToSent() {
    this.order.state = 'Sent';
    this.orderService.changeStatusOfOrder(this.order).subscribe();
  }

  changeStatusOfOrderToDelivered() {
    this.order.state = 'Delivered';
    this.orderService.changeStatusOfOrder(this.order).subscribe();
  }
  navigateToOrderList() {
    this.router.navigate(['order-list']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
