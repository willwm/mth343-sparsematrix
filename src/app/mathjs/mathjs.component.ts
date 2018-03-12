import { Component, OnInit, Input } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  input = '[[1, 2, 4], [0, 4, 2], [0, 0, 5]]';
  output = '';
  equation = '';

  constructor() { }

  ngOnInit() {
    const A = math.matrix(JSON.parse(this.input), 'sparse');
    console.log(A);
    this.output += `input: ${this.input}\n`;
    this.output += `parsed: ${JSON.stringify(A)}\n`;
    const aParsed = math.parse(A.toString());
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
