import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {MenuService} from '../shared/menu.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {LoginService} from '../shared/login.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Subject} from 'rxjs';
import {Dish} from '../shared/dish';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: MenuService;
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new Subject<Dish[]>()
};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [ {provide: MenuService, useValue: menuServiceMock}],
      imports: [HttpClientTestingModule,  RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(MenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call all dishes', () => {
    //when
    component.getDishes();
    //then
    expect(service.getDishes).toHaveBeenCalled();
  });
});
