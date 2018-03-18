import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { BluemathComponent } from './bluemath/bluemath.component';
import { HighlightService } from './highlight.service';
import { LatexService } from './latex.service';
import { MathjsComponent } from './mathjs/mathjs.component';
import { MatrixService } from './matrix.service';
import { HeatmapComponent } from './plotly/heatmap/heatmap.component';
import { StringifyService } from './stringify.service';

@NgModule({
  declarations: [
    AppComponent,
    BluemathComponent,
    MathjsComponent,
    HeatmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [
    Title,
    LatexService,
    HighlightService,
    StringifyService,
    MatrixService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
