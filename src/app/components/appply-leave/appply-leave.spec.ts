import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppplyLeave } from './appply-leave';

describe('AppplyLeave', () => {
  let component: AppplyLeave;
  let fixture: ComponentFixture<AppplyLeave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppplyLeave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppplyLeave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
