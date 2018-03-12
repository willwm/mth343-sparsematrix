import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
