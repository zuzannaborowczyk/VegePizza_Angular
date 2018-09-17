import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../shared/menu.service';
import {Dish} from '../../shared/dish';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  dish: Dish = {} as Dish;
  sub: Subscription;
  constructor(private readonly router: ActivatedRoute, private readonly menuService: MenuService) {}

  ngOnInit() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
   this.sub = this.menuService.getDish(id).pipe(takeUntil(this.destroy$)).subscribe(menu => this.dish = menu);
  }
  changeAvailabilityOfDish(dish: Dish) {
    this.sub = this.menuService.changeAvailabilityOfDish(dish).subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
