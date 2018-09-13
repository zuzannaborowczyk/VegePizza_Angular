import {Component, OnInit} from '@angular/core';
import {Dish} from '../../shared/dish';
import {Subject, Subscription} from 'rxjs';
import {CartService} from '../../shared/cart.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  dishes: Dish[] = [];
  sub: Subscription;
  index: number;

  constructor(private readonly cartService: CartService, private readonly router: Router) {
  }

  ngOnInit() {
    this.dishes = (JSON.parse(localStorage.getItem('cart') ? localStorage.getItem('cart') : '[]') as Dish[]);
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe(dishes => {
      this.dishes = dishes;
      localStorage.setItem('cart', JSON.stringify(this.dishes));
    });

  }
  showTotalCost(): number {
   return this.dishes.reduce((a, b) => parseFloat(String(a)) + parseFloat(String(b.price)), 0);

  // [1, 2, 3].reduce((a, b) => a + b, 0) ---> bierze najpierw 0 i dodaje do pierwszego z tablicy;

  }
  deleteOrderedDish() {
    this.cartService.deleteFromCart(this.index);
  }

  navigateToSummary() {
    this.router.navigate(['/makeAnOrder']);
  }
}
