import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/menu.service';
import {CartService} from '../shared/cart.service';
import {Router} from '@angular/router';
import {Dish} from '../shared/dish';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-owner-menu',
  templateUrl: './owner-menu.component.html',
  styleUrls: ['./owner-menu.component.scss']
})
export class OwnerMenuComponent implements OnInit {

  dishes: Dish[];

  constructor(public readonly menuService: MenuService, private readonly cartService: CartService, private readonly router: Router) { }

  ngOnInit() {
    this.menuService.dishes$.subscribe(dishes => this.dishes = dishes);
    this.cartService.dishesInCart$.subscribe(dishes => this.dishes = dishes);
    this.cartService.getDishesInCart();
    this.getDishes();
  }

  getDishes() {
    this.menuService.getDishes();
  }
  getPizza() {
    this.menuService.dishes$.subscribe(dishes => this.dishes = dishes);
    this.menuService.getPizza();
  }
  getNoodles() {
    this.menuService.dishes$.subscribe(dishes => this.dishes = dishes);
    this.menuService.getNoodles();
  }
  addNewDish(dish: Dish) {
    this.menuService.addNewDish(dish);
  }
  navigateToDetails(id: number): void {
    this.router.navigate(['/dishes', id]);
  }
  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/admin']);
  }
  navigateToLogin() {
    this.cartService.getDishesInCart();
    this.router.navigate(['/login']);
  }
  navigateToOrderList() {
    this.router.navigate(['/order-list']);
  }
  }
