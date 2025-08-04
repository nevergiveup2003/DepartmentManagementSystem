import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashvoard } from './employee-dashvoard';

describe('EmployeeDashvoard', () => {
  let component: EmployeeDashvoard;
  let fixture: ComponentFixture<EmployeeDashvoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDashvoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDashvoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
