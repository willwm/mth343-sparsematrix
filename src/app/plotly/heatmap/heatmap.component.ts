import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as math from 'mathjs';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit, OnChanges {
  @Input() matrix: mathjs.Matrix;

  constructor() { }

  ngOnInit() {
    if (this.matrix != null) {
      this.plotHeatMap(this.matrix);
    }
  }

  ngOnChanges() {
    if (this.matrix != null) {
      this.plotHeatMap(this.matrix);
    }
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
    console.group('HeatmapComponent.plotHeatMap()');
    console.log('plotData:', plotData[0]);
    console.log('layout:', layout);
    console.groupEnd();
    Plotly.newPlot('plotly', plotData, layout, {displayModeBar: false});
  }

}
