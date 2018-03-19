import { Component, OnInit, Input } from '@angular/core';
import * as math from 'mathjs';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  @Input() name: string;
  @Input() matrix: mathjs.Matrix;
  matrixEquation: string;

  constructor() { }

  ngOnInit() {
    if (this.name && this.matrix) {
      this.updateMatrix(this.name, this.matrix);
    }
  }

  updateMatrix(name: string, matrix: mathjs.Matrix): void {
    this.name = name;
    this.matrix = matrix;
    this.matrixEquation = `${name} = ${this.toTex(matrix)}`;
    console.log(name, matrix);
  }

  toTex(matrix: mathjs.Matrix): string {
    const array = (matrix as any).toArray();
    let latex = '\\begin{bmatrix}\n';
    for (const row of array) {
      latex += `  ${row.join(' & ')} \\\\ \n`;
    }
    latex += '\\end{bmatrix}\n';
    return latex;
  }

}
