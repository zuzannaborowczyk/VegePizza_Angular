import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {MenuService} from '../../shared/menu.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {Dish} from '../../shared/dish';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('DetailsComponent', () => {
  const dish$: Observable<Dish> = new Observable();
  const dish: Dish = {
    name: 'FatPizza',
    description: 'very fat',
    id: 1,
    isAvailable: true,
    price: 14,
    type: 'pizza'
  };
  const mockedDishes: Dish[] = [{
    name: 'FatPizza',
    description: 'very fat',
    id: 1,
    isAvailable: true,
    price: 14,
    type: 'pizza'
  }, {
    name: 'VegePizza',
    description: 'very fit',
    id: 2,
    isAvailable: false,
    price: 13,
    type: 'pizza'
  }];
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let service: MenuService;
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    getDish: jasmine.createSpy('getDish').and.returnValue(dish$),
    changeAvailabilityOfDish: jasmine.createSpy('changeAvailabilityOfDish').and.returnValue(dish$),
    dishes$: new Subject<Dish[]>(),
    sub: Subscription
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers: [ {provide: MenuService, useValue: menuServiceMock}],
      imports: [HttpClientTestingModule,  RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(MenuService);
  });

  it('should change availability from true to false', () => {
    // given
    const isAvailable = dish.isAvailable;
    // when
    component.changeAvailabilityOfDish(dish);
    // then
    expect(service.changeAvailabilityOfDish).toHaveBeenCalled();
    expect(dish.isAvailable).toEqual(!isAvailable);

  });
});
