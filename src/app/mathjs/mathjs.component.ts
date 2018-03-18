import { Component, OnInit, AfterViewChecked } from '@angular/core';
import * as math from 'mathjs';
import * as Plotly from 'plotly.js';

import { LatexService } from '../latex.service';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit, AfterViewChecked {

  // tslint:disable-next-line:max-line-length
  input = '[[1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7], [0,0,1,2,3,4,5,6], [0,0,0,1,2,3,4,5], [0,0,0,0,1,2,3,4], [0,0,0,0,0,1,2,3], [0,0,0,0,0,0,1,2], [0,0,0,0,0,0,0,1]]';

  matrix: mathjs.Matrix;
  matrixEquation: string;
  transpose: mathjs.Matrix;
  transposeEquation: string;
  multiply: mathjs.Matrix;
  multiplyEquation: string;
  q: mathjs.Matrix;
  qTranspose: mathjs.Matrix;
  r: mathjs.Matrix;
  qEquation: string;
  qTransposeEquation: string;
  rEquation: string;

  highlighted = false;

  constructor(
    private latexService: LatexService,
    private matrixService: MatrixService
  ) { }

  ngOnInit() {
    this.updateMatrix();
  }

  ngAfterViewChecked() {
  }

  updateMatrix(): void {
    const inputArray = JSON.parse(this.input);

    if (inputArray != null) {
      this.matrix = math.sparse(inputArray);
      this.matrixEquation = this.matrixService.toTex(this.matrix, 'A');
      console.log('csr(A):', this.matrix);

      this.transpose = math.transpose(this.matrix) as mathjs.Matrix;
      this.transposeEquation = this.matrixService.toTex(this.transpose, 'B = A^T');
      console.log('csr(B):', this.transpose);

      this.multiply = math.multiply(this.matrix, this.transpose);
      this.multiplyEquation = this.matrixService.toTex(this.multiply, 'C = AB');
      console.log('csr(C):', this.multiply);

      const denseMatrix = math.matrix(inputArray, 'dense');
      this.updateQR(denseMatrix);
    }
  }

  updateQR(matrix: mathjs.Matrix): void {
    // TODO: Update @types/mathjs or augment math export with missing qr() function!
    const qr = (math as any).qr(matrix);

    this.q = math.sparse(qr.Q);
    this.qEquation = this.matrixService.toTex(this.q, 'Q');
    console.log('Q:', this.q);

    this.qTranspose = math.transpose(this.q) as mathjs.Matrix;
    this.qTransposeEquation = this.matrixService.toTex(this.qTranspose, 'Q^T');
    console.log('Q^T:', this.qTranspose);

    this.r = math.sparse(qr.R);
    this.rEquation = this.matrixService.toTex(this.r, 'R');
    console.log('R:', this.r);
  }
}
