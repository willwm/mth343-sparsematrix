import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { arr, NDArray } from '@bluemath/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sparse Matrix Sample';
  equation =
    `A =
    \\begin{bmatrix}
    3 & 4 & 5 \\\\
    0 & 3 & 4 \\\\
    1 & 3 & 5 \\\\
    \\end{bmatrix}`;

  public constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
