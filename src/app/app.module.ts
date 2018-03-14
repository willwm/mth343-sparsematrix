import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { BluemathComponent } from './bluemath/bluemath.component';
import { MathjsComponent } from './mathjs/mathjs.component';
import { LatexService } from './latex.service';

@NgModule({
  declarations: [
    AppComponent,
    BluemathComponent,
    MathjsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule
  ],
  providers: [
    Title,
    LatexService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
