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
import { StringifyService } from './stringify.service';

@NgModule({
  declarations: [
    AppComponent,
    MathjsComponent,
    MatrixComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    Title,
    HighlightService,
    StringifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
