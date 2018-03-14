import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class LatexService {

  constructor() { }

  getMatrix(array: any): string {
    let latex = '\\begin{bmatrix}\n';
    for (const row of array) {
      latex += `  ${row.join(' & ')} \\\\ \n`;
    }
    latex += '\\end{bmatrix}\n';
    console.log(latex);
    return latex;
  }

}
