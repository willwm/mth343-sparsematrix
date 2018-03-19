import { Component, OnInit, Input } from '@angular/core';

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
    this.matrixEquation = `${this.name} = ${this.toTex(this.matrix)}`;
    console.log(this.name, this.matrix);
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
