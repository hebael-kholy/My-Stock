import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideOrderComponent } from './side-order.component';

describe('SideOrderComponent', () => {
  let component: SideOrderComponent;
  let fixture: ComponentFixture<SideOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
