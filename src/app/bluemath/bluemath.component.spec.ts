import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';
import { arr, NDArray } from '@bluemath/common';
import { matmul, triu, tril } from '@bluemath/linalg';

import { BluemathComponent } from './bluemath.component';

describe('BluemathComponent', () => {
  let component: BluemathComponent;
  let fixture: ComponentFixture<BluemathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluemathComponent ],
      imports: [
        FormsModule,
        KatexModule
      ],
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
