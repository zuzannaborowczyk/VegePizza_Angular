import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {MenuService} from '../../shared/menu.service';
import {Subject} from 'rxjs';
import {Dish} from '../../shared/dish';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let service: MenuService;
  const menuServiceMock = {
    getDishes: jasmine.createSpy('getDishes'),
    dishes$: new Subject<Dish[]>()
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

  it('should create', () => {
    expect(component.changeAvailabilityOfDish).toHaveBeenCalled();
  });
});
