import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferPage } from './chofer.page';

describe('ChoferPage', () => {
  let component: ChoferPage;
  let fixture: ComponentFixture<ChoferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
