import { Injectable } from '@angular/core';
import { LatexService } from './latex.service';
import { StringifyService } from './stringify.service';

import * as math from 'mathjs';

@Injectable()
export class MatrixService {
  constructor(
    private latexService: LatexService,
    private stringifyService: StringifyService
  ) {}

  toTex(matrix: mathjs.Matrix, label: string): string {
    const array = (matrix as any).toArray();
    const latex = this.latexService.getMatrix(array);
    return `${label} = ${latex}`;
  }

  toJsonString(matrix: mathjs.Matrix): string {
    const matrixJson = matrix.toJSON();

    const jsonString = `{
  'values':   ${JSON.stringify(matrixJson.values)},
  'index':    ${JSON.stringify(matrixJson.index)},
  'ptr':      ${JSON.stringify(matrixJson.ptr)},
  'size':     ${JSON.stringify(matrixJson.size)}
}`;

    return jsonString;
  }
}
