import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  output: string;

  constructor() { }

  ngOnInit() {
    const A = math.matrix([[1, 2], [3, 4]]);
    this.output = A.toString();
    console.log(A);
  }

}
