import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  inputArray;

  matrix: Matrix;
  transpose: Matrix;
  multiply: Matrix;
  q: Matrix;
  qTranspose: Matrix;
  r: Matrix;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDataFromFile();
  }

  loadDataFromFile(url = '/data/ibm32.mtx.json') {
    this.http.get(url).subscribe(data => {
      this.inputArray = this.parseMtx(data);

      console.log(this.inputArray);
      const matrix = new Matrix(this.inputArray, 'A');

      this.updateMatrix(matrix);
      this.updateQR(matrix);
    });
  }

  parseMtx(json) {
    const dim = json.dimensions;
    const data = json.data;
    const matrix = new Array(dim[0])
      .fill(0)
      .map(() => new Array(dim[1]).fill(0));
    for (const d of data) {
      // console.log("matrix:", matrix);
      const row = d[0] - 1;
      const col = d[1] - 1;
      // console.log("row:", row, "col:", col);
      matrix[col][row] = 1;
    }
    return matrix;
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
