import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarPopupComponent } from './snackbar-popup.component';

describe('SnackbarPopupComponent', () => {
  let component: SnackbarPopupComponent;
  let fixture: ComponentFixture<SnackbarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
