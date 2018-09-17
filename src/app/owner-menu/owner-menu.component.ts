import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../shared/menu.service';
import {CartService} from '../shared/cart.service';
import {Router} from '@angular/router';
import {Dish} from '../shared/dish';
import {Subject} from 'rxjs';
import {LoginService} from '../shared/login.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-owner-menu',
  templateUrl: './owner-menu.component.html',
  styleUrls: ['./owner-menu.component.scss']
})
export class OwnerMenuComponent implements OnInit, OnDestroy {

  dishes: Dish[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public readonly menuService: MenuService,
              private readonly cartService: CartService,
              private readonly loginService: LoginService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.menuService.dishes$.pipe(takeUntil(this.destroy$)).subscribe(dishes => {
      if (dishes !== null) {
        this.dishes = dishes;
      }
    });
    this.cartService.dishesInCart$.pipe(takeUntil(this.destroy$)).subscribe(dishes => this.dishes = dishes);
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

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
  logout() {
    this.loginService.logout();
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/dishes', id]);
  }

  navigateToMenu() {
    this.menuService.getDishes();
    this.router.navigate(['/admin']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToOrderList() {
    this.router.navigate(['/order-list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
