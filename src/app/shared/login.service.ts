import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  sub: Subscription;
  user: User = {} as User;
  private loggedIn = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  authenticate(name: string, password: string) {
    return this.httpClient.get<User[]>('http://localhost:3000/users', {params: {name: name}})
      .pipe(map(x => x.filter(y => y.password === password)));
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(name: string, password: string) {
    this.authenticate(name, password).subscribe(res => {
      if (res.length !== 0) {
        this.loggedIn = true;
        this.router.navigate(['/admin']);
      } else {
        alert('Wrong login or password!');
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
