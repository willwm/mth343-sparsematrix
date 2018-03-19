import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

import { Matrix } from '../matrix/matrix';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  input = '[[1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7], [0,0,1,2,3,4,5,6], [0,0,0,1,2,3,4,5], [0,0,0,0,1,2,3,4], [0,0,0,0,0,1,2,3], [0,0,0,0,0,0,1,2], [0,0,0,0,0,0,0,1]]';

  matrix: Matrix;
  transpose: Matrix;
  multiply: Matrix;
  q: Matrix;
  qTranspose: Matrix;
  r: Matrix;

  constructor() {}

  ngOnInit() {
    const matrix = new Matrix(this.input, 'A');

    this.updateMatrix(matrix);
    this.updateQR(matrix);
  }

  updateMatrix(matrix: Matrix): void {
    this.matrix = matrix;
    this.transpose = matrix.transpose('B');
    this.multiply = matrix.multiplyBy(this.transpose, 'C');
  }

  updateQR(matrix: Matrix): void {
    const qr = matrix.qr();
    this.q = qr.Q;
    this.qTranspose = qr.Q.transpose('Q^T');
    this.r = qr.R;
  }
}
