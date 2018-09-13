import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../shared/menu.service';
import {Dish} from '../../shared/dish';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  dish: Dish = {
    'id': 1,
    'name': 'Pizza Margherita',
    'isAvailable': true,
    'description': 'Sos, ser',
    'type': 'pizza',
    'price': 22,
  };
  sub: Subscription;
  constructor(private readonly router: ActivatedRoute, private readonly menuService: MenuService) {}

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
   this.sub = this.menuService.getDish(+id).subscribe(menu => this.dish = menu);
  }
  changeAvailabilityOfDish() {
    this.dish.isAvailable = !this.dish.isAvailable;
    this.sub = this.menuService.changeAvailabilityOfDish(this.dish).subscribe();
  }
}
