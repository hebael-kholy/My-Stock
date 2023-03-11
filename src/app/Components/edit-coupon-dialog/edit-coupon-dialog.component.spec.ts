import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCouponDialogComponent } from './edit-coupon-dialog.component';

describe('EditCouponDialogComponent', () => {
  let component: EditCouponDialogComponent;
  let fixture: ComponentFixture<EditCouponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCouponDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
