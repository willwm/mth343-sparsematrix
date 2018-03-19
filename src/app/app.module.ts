import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { HighlightService } from './highlight.service';
import { MathjsComponent } from './mathjs/mathjs.component';
import { MatrixComponent } from './matrix/matrix.component';
import { HeatmapComponent } from './plotly/heatmap/heatmap.component';
import { StringifyService } from './stringify.service';

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
    MatExpansionModule
  ],
  providers: [
    Title,
    HighlightService,
    StringifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
