import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeeform } from './employeeform';

describe('Employeeform', () => {
  let component: Employeeform;
  let fixture: ComponentFixture<Employeeform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeeform],
    }).compileComponents();

    fixture = TestBed.createComponent(Employeeform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
