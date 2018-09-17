import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Order} from '../../shared/order';
import {Dish} from '../../shared/dish';
import {FormControl, FormGroup} from '@angular/forms';
import {MenuService} from '../../shared/menu.service';
import {OrderService} from '../../shared/order.service';
import {CartService} from '../../shared/cart.service';

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.scss']
})
export class AddressformComponent implements OnInit {


  order: Order;
  dishes: Dish[];
  dishesIds: number[];

  newForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    telephone: new FormControl(),
    email: new FormControl(),
    city: new FormControl(),
    street: new FormControl()
  });

  constructor(private readonly orderService: OrderService, private readonly cartService: CartService) {
    this.dishesIds = [];
    this.order = <Order>{};
  }

  ngOnInit() {
    this.getDishes();
  }

  createOrder(): void {
    this.order.dishIds = this.dishesIds;
    this.order.firstName = this.newForm.get('firstName').value;
    this.order.lastName = this.newForm.get('lastName').value;
    this.order.city = this.newForm.get('city').value;
    this.order.street = this.newForm.get('street').value;
    this.order.email = this.newForm.get('email').value;
    this.order.telephone = this.newForm.get('telephone').value;
    this.order.date = new Date();
    this.orderService.createOrder(this.order);
  }

  getDishes(): void {
    this.dishesIds = (JSON.parse(localStorage.getItem('cart') ? localStorage.getItem('cart') : '[]').map(dish => dish.id) as number[]);
  }

}
