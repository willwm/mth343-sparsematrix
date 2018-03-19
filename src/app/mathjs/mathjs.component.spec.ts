import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';

import { HighlightService } from '../highlight.service';
import { MatrixComponent } from '../matrix/matrix.component';
import { HeatmapComponent } from '../plotly/heatmap/heatmap.component';
import { StringifyService } from '../stringify.service';
import { MathjsComponent } from './mathjs.component';

describe('MathjsComponent', () => {
  let component: MathjsComponent;
  let fixture: ComponentFixture<MathjsComponent>;

  beforeEach(async(() => {
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
        MatExpansionModule
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
});
