import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  input = '[[1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7], [0,0,1,2,3,4,5,6], [0,0,0,1,2,3,4,5], [0,0,0,0,1,2,3,4], [0,0,0,0,0,1,2,3], [0,0,0,0,0,0,1,2], [0,0,0,0,0,0,0,1]]';

  matrix: mathjs.Matrix;
  transpose: mathjs.Matrix;
  multiply: mathjs.Matrix;
  q: mathjs.Matrix;
  qTranspose: mathjs.Matrix;
  r: mathjs.Matrix;

  constructor() {}

  ngOnInit() {
    const inputArray = JSON.parse(this.input);

    this.updateMatrix(inputArray);
    this.updateQR(inputArray);
  }

  updateMatrix(matrix: mathjs.Matrix): void {
    this.matrix = math.sparse(matrix);
    this.transpose = math.transpose(this.matrix) as mathjs.Matrix;
    this.multiply = math.multiply(this.matrix, this.transpose);
  }

  updateQR(matrix: mathjs.Matrix): void {
    // TODO: Update @types/mathjs or augment math export with missing qr() function!
    const denseMatrix = math.matrix(matrix, 'dense');
    const qr = (math as any).qr(denseMatrix);
    this.q = math.sparse(qr.Q);
    this.qTranspose = math.transpose(this.q) as mathjs.Matrix;
    this.r = math.sparse(qr.R);
  }
}
