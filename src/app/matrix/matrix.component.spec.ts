import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as math from 'mathjs';
import { KatexModule } from 'ng-katex';

import { MatrixComponent } from './matrix.component';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;
  const name = 'A';
  const matrix = math.matrix([[1, 0], [0, 1]]);

  beforeEach(
    async(() => {
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
    const newMatrix = math.matrix([[1, 2], [3, 4]]);
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
