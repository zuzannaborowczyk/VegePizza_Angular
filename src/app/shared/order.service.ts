import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from './order';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private httpClient: HttpClient, private  router: Router) { }

  createOrder(order: Order) {
    this.httpClient.post<Order>('http://localhost:3000/orders', order).subscribe(res => console.log(res));
    this.router.navigate(['summary']);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('http://localhost:3000/orders');
  }
  getOrder(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`http://localhost:3000/orders/${id}`);
  }
  changeStatusOfOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(`http://localhost:3000/orders/${order.id}`, order);
  }
}
