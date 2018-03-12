import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathjsComponent } from './mathjs.component';

describe('MathjsComponent', () => {
  let component: MathjsComponent;
  let fixture: ComponentFixture<MathjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
