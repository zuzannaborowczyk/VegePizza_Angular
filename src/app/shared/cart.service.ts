import { Injectable } from '@angular/core';
import {Dish} from './dish';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCost: number;
  dishes: Dish[];
  cart$ = new Subject<Dish[]>();
  dishesInCart$ = new Subject<Dish[]>();
  orderedDishes: Dish[] = [];

  constructor() { }


  addDishToCart(dish: Dish): void {
    this.orderedDishes.push(dish);
    this.cart$.next(this.orderedDishes);
    this.calculateCartCost();
  }
  calculateCartCost(): number {
    this.cartCost = 0;
    this.orderedDishes.forEach(dish => this.cartCost += parseFloat(String(dish.price)));
    return this.cartCost;
  }
  deleteFromCart(index: number): void {
    this.orderedDishes.splice(index, 1);
    this.cart$.next(this.orderedDishes);
    this.calculateCartCost();
  }
  getDishesInCart() {
    return this.cart$.subscribe();
     }
}
