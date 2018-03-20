import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Matrix } from './matrix';
import * as math from 'mathjs';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() matrix: Matrix;
  matrixEquation: string;

  constructor() { }

  ngOnInit() {
    this.updateMatrix(this.name, this.matrix);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMatrix(this.name, this.matrix);
  }

  updateMatrix(name: string, matrix: Matrix): void {
    if (!name || ! matrix) { return; }
    this.name = name;
    this.matrix = matrix;
    this.matrixEquation = `${name} = ${this.toTex(matrix)}`;
    console.log(name, matrix.toJSON());
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
