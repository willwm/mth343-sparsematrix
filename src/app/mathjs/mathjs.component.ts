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

  matrix: mathjs.Matrix;

  constructor(private latexService: LatexService) {}

  ngOnInit() {
    this.updateMatrix();
  }

  updateMatrix() {
    const inputArray = JSON.parse(this.input);
    this.matrix = math.sparse(inputArray);
    console.log(this.matrix);
    console.log(this.matrix.toJSON());
    this.output = JSON.stringify(this.matrix, ['values', 'index', 'ptr', 'size']);
    this.equation = `\\KaTeX: A = ${this.toTex(this.matrix)}`;
    this.plotHeatMap(this.matrix);
  }

  toTex(matrix: mathjs.Matrix): string {
    // @types/mathjs appears to be missing some method definitions, so I'm using this odd approach to avoid tsc errors. =P
    const aString = matrix.toString();
    const aJson = JSON.parse(aString);
    let latex = '\\begin{bmatrix}\n';
    for (const row of aJson) {
      latex += `  ${row.join(' & ')} \\\\ \n`;
    }
    latex += '\\end{bmatrix}\n';
    console.log(aString);
    console.log(latex);
    return latex;
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
    console.log(plotData);
    Plotly.newPlot('plotly', plotData, layout, {displayModeBar: false});
  }
}
