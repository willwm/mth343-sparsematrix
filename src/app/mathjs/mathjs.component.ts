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

  matrix: mathjs.Matrix;
  matrixEquation: string;
  transpose: mathjs.Matrix;
  transposeEquation: string;
  multiply: mathjs.Matrix;
  multiplyEquation: string;
  q: mathjs.Matrix;
  r: mathjs.Matrix;
  qEquation: string;
  rEquation: string;

  constructor(private latexService: LatexService) {}

  ngOnInit() {
    this.updateMatrix();
  }

  updateMatrix(): void {
    try {
      this.matrix = this.getSparseMatrix(this.input);
      this.matrixEquation = this.toTex(this.matrix, 'A');
      console.log('csr(A):', this.matrix);
      this.transpose = math.transpose(this.matrix) as mathjs.Matrix;
      this.transposeEquation = this.toTex(this.transpose, 'B = A^T');
      console.log('csr(B):', this.transpose);
      this.multiply = math.multiply(this.matrix, this.transpose);
      this.multiplyEquation = this.toTex(this.multiply, 'C = AB');
      console.log('csr(C):', this.multiply);
      this.updateQR(this.matrix);
    } catch (SyntaxError) {
      // TODO: Find better way to handle unfinished edits from input text field!
    }
  }

  updateQR(matrix: mathjs.Matrix): void {
    // TODO: Update @types/mathjs or augment math export with missing qr() function!
    const many: any = math;
    const qr = many.qr(matrix);
    console.log('QR:', qr);
    this.q = qr.q;
    this.qEquation = this.toTex(this.q, 'Q');
    this.r = qr.r;
    this.rEquation = this.toTex(this.q, 'R');
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

  toTex(matrix: mathjs.Matrix, label: string): string {
    const array = (matrix as any).toArray();
    const latex = this.latexService.getMatrix(array);
    return `${label} = ${latex}`;
  }
}
