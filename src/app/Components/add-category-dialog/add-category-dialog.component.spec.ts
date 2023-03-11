import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryDialogComponent } from './add-category-dialog.component';

describe('AddCategoryDialogComponent', () => {
  let component: AddCategoryDialogComponent;
  let fixture: ComponentFixture<AddCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
