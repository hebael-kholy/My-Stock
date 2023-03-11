import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponDialogComponent } from './add-coupon-dialog.component';

describe('AddCouponDialogComponent', () => {
  let component: AddCouponDialogComponent;
  let fixture: ComponentFixture<AddCouponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCouponDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
