import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as math from 'mathjs';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit, OnChanges {
  @Input() id = 'plotly';
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
      },
      width: 350,
      height: 250,
      margin: {
        t: 35, l: 40, b: 35, r: 40
      }
    };
    Plotly.newPlot(this.id, plotData, layout, {displayModeBar: false});
  }

}
