import { TestBed, async } from '@angular/core/testing';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { BluemathComponent } from './bluemath/bluemath.component';
import { MathjsComponent } from './mathjs/mathjs.component';
import { LatexService } from './latex.service';
import { HeatmapComponent } from './plotly/heatmap/heatmap.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BluemathComponent,
        MathjsComponent,
        HeatmapComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        KatexModule
      ],
      providers: [LatexService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Sparse Matrix Sample'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sparse Matrix Sample');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sparse Matrix Sample');
  }));
});
