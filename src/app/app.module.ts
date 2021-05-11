import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { HighlightService } from './highlight.service';
import { MathjsComponent } from './mathjs/mathjs.component';
import { MatrixComponent } from './matrix/matrix.component';
import { HeatmapComponent } from './plotly/heatmap/heatmap.component';
import { StringifyService } from './stringify.service';

import * as PlotlyJS from 'plotly.js-dist';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    MathjsComponent,
    HeatmapComponent,
    MatrixComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatExpansionModule,
    HttpClientModule,
    PlotlyModule
  ],
  providers: [
    Title,
    HighlightService,
    StringifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
