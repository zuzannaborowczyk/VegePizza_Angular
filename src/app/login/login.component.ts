import {Component, OnInit} from '@angular/core';
import {LoginService} from '../shared/login.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sub: Subscription;
  loginForm = new FormGroup({
    name: new FormControl(),
    password: new FormControl()
  });

  constructor(private readonly loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {

    this.loginService.login(this.loginForm.get('name').value, this.loginForm.get('password').value);
  }
}
