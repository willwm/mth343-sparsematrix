import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit, OnChanges {
  input = '[[1, 2, 4], [0, 4, 2], [0, 0, 5]]';
  output: string;
  equation: string;

  constructor() { }

  ngOnInit() {
    this.updateMatrix();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  updateMatrix() {
    const A = math.matrix(JSON.parse(this.input), 'sparse');
    console.log(A);
    this.output = '';
    this.output += `parsed: ${JSON.stringify(A)}\n`;
    this.equation = `\\KaTeX: A = ${this.toTex(A)}`;
  }

  toTex(matrix: mathjs.Matrix): string {
    // @types/mathjs appears to be missing some method definitions, so I'm using this odd approach to avoid tsc errors. =P
    const aString = matrix.toString();
    const aJson = JSON.parse(aString);
    let latex = '\\begin{bmatrix}\n';
    for (const row of aJson) {
      latex += `  ${row.join(' & ')} \\\\ \n`;
    }
    latex += '\\end{bmatrix}\n';
    console.log(aString);
    console.log(latex);
    return latex;
  }

}
