import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';
import { HttpClientModule } from '@angular/common/http';

import { HighlightService } from '../highlight.service';
import { MatrixComponent } from '../matrix/matrix.component';
import { HeatmapComponent } from '../plotly/heatmap/heatmap.component';
import { StringifyService } from '../stringify.service';
import { MathjsComponent } from './mathjs.component';
import { Matrix } from '../matrix/matrix';

describe('MathjsComponent', () => {
  let component: MathjsComponent;
  let fixture: ComponentFixture<MathjsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeatmapComponent,
        MathjsComponent,
        MatrixComponent
      ],
      imports: [
        FormsModule,
        KatexModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatExpansionModule,
        HttpClientModule
      ],
      providers: [
        HighlightService,
        StringifyService
      ]
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

  it('should assign properties as expected when updateMatrix() is called', () => {
    const matrix = new Matrix([[1, 2], [3, 4]], 'A');
    const transpose = matrix.transpose('B');
    const multiply = matrix.multiplyBy(transpose, 'C');

    component.updateMatrix(matrix);
    expect(component.matrix).toBe(matrix);
    expect(component.transpose.toArray()).toEqual(transpose.toArray());
    expect(component.multiply.toArray()).toEqual(multiply.toArray());
  });
});
