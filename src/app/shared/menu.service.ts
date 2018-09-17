import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dish} from './dish';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {



  dishes$ = new BehaviorSubject<Dish[]>(null);

  constructor(readonly httpClient: HttpClient) { }

  getDishes(): void {
     this.httpClient.get<Dish[]>('http://localhost:3000/dishes').subscribe(dishes => this.dishes$.next(dishes));
  }
  getDish(id: number): Observable<Dish> {
    return this.httpClient.get<Dish>(`http://localhost:3000/dishes/${id}`);
  }
  getPizza() {
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=pizza').subscribe(dishes => this.dishes$.next(dishes));
  }
  getNoodles() {
    this.httpClient.get<Dish[]>('http://localhost:3000/dishes?type=spagetti').subscribe(dishes => this.dishes$.next(dishes));
  }
  changeAvailabilityOfDish(dish: Dish): Observable<Dish> {
    dish.isAvailable = !dish.isAvailable;
    return this.httpClient.put<Dish>(`http://localhost:3000/dishes/${dish.id}`, dish);
  }
  addNewDish(dish: Dish): void {
    this.httpClient.post('http://localhost:3000/dishes', dish).subscribe(dishes => this.getDishes());
  }
}
