import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChoferPage } from './register-chofer.page';

describe('RegisterChoferPage', () => {
  let component: RegisterChoferPage;
  let fixture: ComponentFixture<RegisterChoferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChoferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
