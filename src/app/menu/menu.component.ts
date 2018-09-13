import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {MenuService} from '../shared/menu.service';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CartService} from '../shared/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  dishes: Dish[];
  sub: Subscription;
  dishes2$ = new Subject<Dish[]>();

  constructor(public readonly menuService: MenuService, private readonly cartService: CartService, private readonly router: Router) { }

  ngOnInit() {
    this.menuService.dishes$.subscribe(dishes => this.dishes = dishes);
    this.menuService.getDishes();
    this.cartService.dishesInCart$.subscribe(dishes => this.dishes = dishes);
    this.cartService.getDishesInCart();
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
  addDishToCart(dish: Dish) {

    this.cartService.addDishToCart(dish);
  }
    ngOnDestroy(): void {
  }
  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/menu']);
  }

  navigateToMyOrders() {
    this.cartService.getDishesInCart();
    this.router.navigate(['/myOrders']);
  }
  navigateToMakeAnOrder() {
    this.cartService.getDishesInCart();
    this.router.navigate(['/makeAnOrder']);
  }
  navigateToLogin() {
    this.cartService.getDishesInCart();
    this.router.navigate(['/login']);
  }

}
