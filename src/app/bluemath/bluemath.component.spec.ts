import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluemathComponent } from './bluemath.component';

describe('BluemathComponent', () => {
  let component: BluemathComponent;
  let fixture: ComponentFixture<BluemathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluemathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluemathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
