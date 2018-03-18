import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';

import { LatexService } from '../latex.service';
import { MathjsComponent } from './mathjs.component';
import { HeatmapComponent } from '../plotly/heatmap/heatmap.component';
import { HighlightService } from '../highlight.service';
import { MatrixService } from '../matrix.service';
import { StringifyService } from '../stringify.service';

describe('MathjsComponent', () => {
  let component: MathjsComponent;
  let fixture: ComponentFixture<MathjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MathjsComponent,
        HeatmapComponent
      ],
      imports: [
        FormsModule,
        KatexModule
      ],
      providers: [
        HighlightService,
        LatexService,
        MatrixService,
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
});
