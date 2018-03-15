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

  constructor(private latexService: LatexService) { }

  ngOnInit() {
    this.updateMatrix();
  }

  updateMatrix(): void {
    const inputArray = this.parseArray(this.input);

    if (inputArray != null) {
      this.matrix = math.sparse(inputArray);
      this.matrixEquation = this.toTex(this.matrix, 'A');
      console.log('csr(A):', this.matrix);

      this.transpose = math.transpose(this.matrix) as mathjs.Matrix;
      this.transposeEquation = this.toTex(this.transpose, 'B = A^T');
      console.log('csr(B):', this.transpose);

      this.multiply = math.multiply(this.matrix, this.transpose);
      this.multiplyEquation = this.toTex(this.multiply, 'C = AB');
      console.log('csr(C):', this.multiply);

      const denseMatrix = math.matrix(inputArray, 'dense');
      this.updateQR(denseMatrix);
    }
  }

  updateQR(matrix: mathjs.Matrix): void {
    // TODO: Update @types/mathjs or augment math export with missing qr() function!
    const qr = (math as any).qr(matrix);
    console.log('QR:', qr);
    this.q = qr.Q;
    this.qEquation = this.toTex(this.q, 'Q');
    this.r = qr.R;
    this.rEquation = this.toTex(this.q, 'R');
  }

  parseArray(input: string): any[] {
    try {
      const inputArray = JSON.parse(input);
      return inputArray;
    } catch (error) {
      // TODO: Find better way to handle unfinished edits from input text field!
      return null;
    }
  }

  toTex(matrix: mathjs.Matrix, label: string): string {
    const array = (matrix as any).toArray();
    const latex = this.latexService.getMatrix(array);
    return `${label} = ${latex}`;
  }
}
