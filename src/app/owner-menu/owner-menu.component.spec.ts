import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnerMenuComponent} from './owner-menu.component';
import {MenuService} from '../shared/menu.service';
import {Subject} from 'rxjs';
import {Dish} from '../shared/dish';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('OwnerMenuComponent', () => {
  let component: OwnerMenuComponent;
  let fixture: ComponentFixture<OwnerMenuComponent>;
  let service: MenuService;
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new Subject<Dish[]>()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMenuComponent ],
      providers: [ {provide: MenuService, useValue: menuServiceMock}],
      imports: [HttpClientTestingModule,  RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(MenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get all dishes', () => {
    //when
    component.getDishes();
    //then
    expect(service.getDishes).toHaveBeenCalled();
  });
});
