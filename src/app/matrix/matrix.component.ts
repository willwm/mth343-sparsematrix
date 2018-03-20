import { Component, OnInit, Input } from '@angular/core';
import { Matrix } from './matrix';
import * as math from 'mathjs';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  @Input() name: string;
  @Input() matrix: Matrix;
  matrixEquation: string;

  constructor() { }

  ngOnInit() {
    if (this.name && this.matrix) {
      this.updateMatrix(this.name, this.matrix);
    }
  }

  updateMatrix(name: string, matrix: Matrix): void {
    this.name = name;
    this.matrix = matrix;
    this.matrixEquation = `${name} = ${this.toTex(matrix)}`;
    console.log(name, matrix);
    console.log(matrix.toArray());
  }

  toTex(matrix: Matrix): string {
    const array = (matrix as any).toArray();
    let latex = '\\begin{bmatrix}\n';
    for (const row of array) {
      latex += `  ${row.join(' & ')} \\\\ \n`;
    }
    latex += '\\end{bmatrix}\n';
    return latex;
  }

}
