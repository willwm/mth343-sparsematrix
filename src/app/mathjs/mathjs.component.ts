import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  output = '';
  equation = '';

  constructor() { }

  ngOnInit() {
    const A = math.matrix([[1, 0, 0], [0, 4, 0], [0, 0, 5]]);
    this.output += JSON.stringify(A);
    console.log(A);
    const B = math.parse('[[3,4,5],[0,3,4],[1,3,5]]');
    this.equation = B.toTex();
    console.log(B);
  }

}
