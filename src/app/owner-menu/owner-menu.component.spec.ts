import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnerMenuComponent} from './owner-menu.component';
import {MenuService} from '../shared/menu.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Dish} from '../shared/dish';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('OwnerMenuComponent', () => {
  let component: OwnerMenuComponent;
  let fixture: ComponentFixture<OwnerMenuComponent>;
  let menuService: MenuService;
  let router: Router;
  const mockedDish = {
    id: 1,
    name: 'FatPizza',
    isAvailable: true,
    description: 'sauce, fat',
    type: 'pizza',
    price: 10
  };
  const mockedDishes: Dish[] = [{
    name: 'FatPizza',
    description: 'very fat',
    id: 1,
    isAvailable: true,
    price: 14,
    type: 'pizza'
  }, {
    name: 'VegeSpagetti',
    description: 'very fat',
    id: 2,
    isAvailable: true,
    price: 14,
    type: 'spagetti'
  }, {
    name: 'Spagetti',
    description: 'very fat',
    id: 3,
    isAvailable: true,
    price: 14,
    type: 'spagetti'
  }, {
    name: 'VegePizza',
    description: 'very fit',
    id: 4,
    isAvailable: false,
    price: 13,
    type: 'pizza'
  }];

  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new BehaviorSubject<Dish[]>(mockedDishes),
    getPizza: jasmine.createSpy('getPizza'),
    getNoodles: jasmine.createSpy('getNoodles')
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ OwnerMenuComponent ],
      providers: [
        {provide: MenuService, useValue: menuServiceMock},
        {provide: Router, useValue: routerMock}],
      imports: [HttpClientTestingModule,  RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMenuComponent);
    component = fixture.componentInstance;
    menuService = TestBed.get(MenuService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get all dishes', () => {
    // when
    component.getDishes();
    // then
    expect(menuService.getDishes).toHaveBeenCalled();
  });
  it('should get all pizzas', () => {
    // given
    const dishes = component.dishes = [];
    // when
    component.getPizza();
    // then
    expect(menuService.getDishes).toHaveBeenCalled();
    expect(component.dishes.length).toBeGreaterThan(dishes.length);
  });
  it('should navigate to details page', () => {
    // when
    component.navigateToDetails(1);
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/dishes', 1]);
  });
  it('should navigate to login page', () => {
    // when
    component.navigateToLogin();
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
  it('should navigate to order-list page', () => {
    // when
    component.navigateToOrderList();
    // then
    expect(router.navigate).toHaveBeenCalledWith(['/order-list']);
  });
});
