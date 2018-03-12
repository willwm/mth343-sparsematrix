import { Component, OnInit } from '@angular/core';
import { arr, NDArray } from '@bluemath/common';
import { matmul, triu, tril } from '@bluemath/linalg';

@Component({
  selector: 'app-bluemath',
  templateUrl: './bluemath.component.html',
  styleUrls: ['./bluemath.component.css']
})
export class BluemathComponent implements OnInit {
  matrix: NDArray;
  vector: NDArray;
  equation: string;

  constructor() { }

  ngOnInit() {
    this.matrix = new NDArray([[3, 4, 5], [0, 3, 4], [1, 3, 5]]);
    this.equation = this.getLatexForMatrix(this.matrix);
  }

    // TODO: Decouple equation and textarea; allow NDArray-style input to be auto-converted to/from KaTeX.
    getLatexForMatrix(ndArray: NDArray): string {
      let latexString = '\\begin{bmatrix}\n';
      const jsArray = ndArray.toArray();
      for (const row of jsArray) {
        latexString += `  ${row.join(' & ')} \\\\ \n`;
      }
      latexString += '\\end{bmatrix}\n';
      return latexString;
    }

}
