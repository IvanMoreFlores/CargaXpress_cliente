import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChoferPage } from './home-chofer.page';

describe('HomeChoferPage', () => {
  let component: HomeChoferPage;
  let fixture: ComponentFixture<HomeChoferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChoferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
