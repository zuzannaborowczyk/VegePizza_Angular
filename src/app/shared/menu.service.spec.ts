import {fakeAsync, TestBed} from '@angular/core/testing';

import {MenuService} from './menu.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Dish} from './dish';
import {LoginService} from './login.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('MenuService', () => {
  let menuService: MenuService;
  let loginService: LoginService;
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
  let mockedBackEnd: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService, LoginService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    mockedBackEnd = TestBed.get(HttpTestingController);
    menuService = TestBed.get(MenuService);
    loginService = TestBed.get(LoginService);
  });

  it('should create', () => {
    expect(menuService).toBeTruthy();
  });
  it('should load all dishes', () => {
    // given
    let exampleDishes: Dish[];
    // when
    menuService.dishes$.subscribe(res => exampleDishes = res);
    menuService.getDishes();
    mockedBackEnd.expectOne('http://localhost:3000/dishes').flush(mockedDishes);
    // then
    expect(exampleDishes.length).toEqual(4);
    }
  );
  it('should load one dish', fakeAsync(() => {
    // given
    let dish: Dish;
    // when
    menuService.getDish(mockedDish.id).subscribe(res => dish = res);
     mockedBackEnd.expectOne('http://localhost:3000/dishes/' + mockedDish.id).flush(mockedDish);
    // then
    expect(dish).toEqual(mockedDish);
    }));
  it('should load all pizzas when getPizza', fakeAsync(() => {
   // when
    menuService.getPizza();
    mockedBackEnd.expectOne('http://localhost:3000/dishes?type=pizza').flush(mockedDishes);


  }));
  it('should load all spagettis when getNoodles', fakeAsync(() => {
   // when
    menuService.getNoodles();
    mockedBackEnd.expectOne('http://localhost:3000/dishes?type=spagetti').flush(mockedDishes);



  }));
  it('should change availability of dish when changeAvailability', fakeAsync(() => {
    // given
    const isAvailable = mockedDish.isAvailable;
    // when
    menuService.changeAvailabilityOfDish(mockedDish).subscribe();
    mockedBackEnd.expectOne('http://localhost:3000/dishes/' + mockedDish.id);

    // then
    expect(mockedDish.isAvailable).toEqual(!isAvailable);
  }));
  it('should add a new dish', fakeAsync(() => {
    // when
    menuService.addNewDish(mockedDish);
    const mockReq = mockedBackEnd.expectOne('http://localhost:3000/dishes');
    console.log(mockReq);


    // then
    expect(mockReq.request.body).toEqual(mockedDish);
    expect(mockReq.request.method).toEqual('POST');

  }));
});
