import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../shared/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent implements OnInit {

  @Input() order: Order;

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }
  navigateToOrderDetails(id: number) {
    this.router.navigate(['order-details', id]);
  }
}
