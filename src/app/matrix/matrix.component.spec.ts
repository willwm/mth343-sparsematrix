import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixComponent } from './matrix.component';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate expected LaTeX output', () => {
    const testArray = [[1, 0], [0, 1]];
    const expectedResult = '\\begin{bmatrix}\n  1 & 0 \\\\ \n  0 & 1 \\\\ \n\\end{bmatrix}\n';
    const result = component.toTex(testArray);

    expect(result).toBe(expectedResult);
  });
});
