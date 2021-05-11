import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KatexModule } from 'ng-katex';

import { Matrix } from './matrix';
import { MatrixComponent } from './matrix.component';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  const name = 'A';
  const matrix = new Matrix([[1, 0], [0, 1]], name);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatrixComponent],
        imports: [KatexModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    component.name = name;
    component.matrix = matrix;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should autogenerate equation from @Input params during ngOnInit()', () => {
    expect(component.name).toBe(name);
    expect(component.matrix).toBe(matrix);
  });

  it('should update component params when updateMatrix() is called', () => {
    const newName = 'B';
    const newMatrix = new Matrix([[1, 2], [3, 4]], newName);
    const newEquation = `${newName} = ${component.toTex(newMatrix)}`;

    component.updateMatrix(newName, newMatrix);
    expect(component.name).toBe(newName);
    expect(component.matrix).toBe(newMatrix);
    expect(component.matrixEquation).toBe(newEquation);
  });

  it('should generate expected LaTeX output from toTex()', () => {
    const testArray = matrix;
    const expectedResult =
      '\\begin{bmatrix}\n  1 & 0 \\\\ \n  0 & 1 \\\\ \n\\end{bmatrix}\n';
    const result = component.toTex(testArray);

    expect(result).toBe(expectedResult);
  });
});
