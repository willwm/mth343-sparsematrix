import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
import * as Plotly from 'plotly.js';

import { LatexService } from '../latex.service';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  input = '[[1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7], [0,0,1,2,3,4,5,6], [0,0,0,1,2,3,4,5], [0,0,0,0,1,2,3,4], [0,0,0,0,0,1,2,3], [0,0,0,0,0,0,1,2], [0,0,0,0,0,0,0,1]]';
  output: string;
  equation: string;

  matrix: mathjs.Matrix;

  constructor(private latexService: LatexService) {}

  ngOnInit() {
    this.updateMatrix();
  }

  updateMatrix() {
    try {
      this.matrix = this.getSparseMatrix(this.input);
      this.output = this.toJsonString(this.matrix);
      this.equation = this.toTex(this.matrix);
    } catch (SyntaxError) {
    }
  }

  getSparseMatrix(input: string): mathjs.Matrix {
    const inputArray = JSON.parse(input);
    const matrix = math.sparse(inputArray);
    return matrix;
  }

  toJsonString(matrix: mathjs.Matrix): string {
    const matrixJson = matrix.toJSON();

    const jsonString =
`{
  'values':   ${JSON.stringify(matrixJson.values)},
  'index':    ${JSON.stringify(matrixJson.index)},
  'ptr':      ${JSON.stringify(matrixJson.ptr)},
  'size':     ${JSON.stringify(matrixJson.size)}
}`;

    return jsonString;
  }

  toTex(matrix: mathjs.Matrix): string {
    const array = (matrix as any).toArray();
    const latex = this.latexService.getMatrix(array);
    return `\\KaTeX : A = ${latex}`;
  }
}
