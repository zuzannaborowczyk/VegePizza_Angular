import {fakeAsync, TestBed} from '@angular/core/testing';

import {MenuService} from './menu.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Dish} from './dish';

describe('MenuService', () => {
  let service: MenuService;
  const mockedDish = {
    id: 5,
    name: 'FatPizza',
    isAvailable: true,
    description: 'sauce, fat',
    type: 'fatty',
    price: 10
  };
  let mockedBackEnd: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuService],
      imports: [HttpClientTestingModule]
    });
    mockedBackEnd = TestBed.get(HttpTestingController);
    service = TestBed.get(MenuService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should load dish', fakeAsync(() => {
    //given
    let dish: Dish;
    //when
     service.getDish(mockedDish.id).subscribe(res => dish = res);
     mockedBackEnd.expectOne('http://localhost:3000/dishes/' + mockedDish.id).flush(mockedDish);
    //then
    expect(dish).toEqual(mockedDish);
    }));
});
