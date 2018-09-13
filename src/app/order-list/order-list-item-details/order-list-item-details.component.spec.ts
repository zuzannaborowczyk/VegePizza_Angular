import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListItemDetailsComponent } from './order-list-item-details.component';

describe('OrderListItemDetailsComponent', () => {
  let component: OrderListItemDetailsComponent;
  let fixture: ComponentFixture<OrderListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
