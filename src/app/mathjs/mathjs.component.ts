import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
import * as Plotly from 'plotly.js';

import { LatexService } from '../latex.service';

@Component({
  selector: 'app-mathjs',
  templateUrl: './mathjs.component.html',
  styleUrls: ['./mathjs.component.css']
})
export class MathjsComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  input = '[[1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7], [0,0,1,2,3,4,5,6], [0,0,0,1,2,3,4,5], [0,0,0,0,1,2,3,4], [0,0,0,0,0,1,2,3], [0,0,0,0,0,0,1,2], [0,0,0,0,0,0,0,1]]';
  output: string;
  equation: string;

  constructor(private latexService: LatexService) {}

  ngOnInit() {
    this.updateMatrix();
  }

  updateMatrix() {
    const matrix = this.getSparseMatrix(this.input);
    this.output = this.toJsonString(matrix);
    this.equation = this.toTex(matrix);
    this.plotHeatMap(matrix);
  }

  getSparseMatrix(input: string): mathjs.Matrix {
    console.group('getSparseMatrix()');
    console.log('input:', input);
    const inputArray = JSON.parse(input);
    const matrix = math.sparse(inputArray);
    console.log('matrix:', matrix);
    console.groupEnd();
    return matrix;
  }

  toJsonString(matrix: mathjs.Matrix): string {
    const matrixJson = matrix.toJSON();

    const jsonString =
`{
  'values':   ${JSON.stringify(matrixJson.values)},
  'index':    ${JSON.stringify(matrixJson.index)},
  'ptr':      ${JSON.stringify(matrixJson.ptr)},
  'size':     ${JSON.stringify(matrixJson.size)}
}`;

    return jsonString;
  }

  toTex(matrix: mathjs.Matrix): string {
    console.group('toTex()');
    const array = (matrix as any).toArray();
    const latex = this.latexService.getMatrix(array);
    const eqn = `\\KaTeX : A = ${latex}`;
    console.log('eqn:', eqn);
    console.groupEnd();
    return eqn;
  }

  plotHeatMap(matrix: mathjs.Matrix): void {
    const mjs = matrix as any;
    const array = mjs.toArray();
    const plotData: any[] = [
      {
        z: array,
        type: 'heatmap',
        colorscale: 'Viridis'
      }
    ];
    const layout: any = {
      xaxis: {
        anchor: 'y1',
        side: 'top',
        ticklen: 0
      },
      yaxis: {
        autorange: 'reversed',
        ticklen: 0
      }
    };
    console.group('plotHeatMap()');
    console.log('plotData:', plotData[0]);
    console.log('layout:', layout);
    console.groupEnd();
    Plotly.newPlot('plotly', plotData, layout, {displayModeBar: false});
  }
}
