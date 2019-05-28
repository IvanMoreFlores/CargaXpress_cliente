import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNegoPage } from './modal-nego.page';

describe('ModalNegoPage', () => {
  let component: ModalNegoPage;
  let fixture: ComponentFixture<ModalNegoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNegoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
