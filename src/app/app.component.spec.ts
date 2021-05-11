import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { KatexModule } from 'ng-katex';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HighlightService } from './highlight.service';
import { MathjsComponent } from './mathjs/mathjs.component';
import { StringifyService } from './stringify.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatrixComponent } from './matrix/matrix.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MathjsComponent,
        MatrixComponent
      ],
      imports: [
        BrowserModule,
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
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Sparse Matrix Sample'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sparse Matrix Sample');
  }));
  it('should render title in a h1 tag', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sparse Matrix Sample');
  }));
});
