/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/chartjs/chart.d.ts" />
import {Component, View, LifecycleEvent} from 'angular2/angular2';

@Component({
    selector: 'graph',
    lifecycle: [LifecycleEvent.onChange],
    properties: ['xs', 'ys'],
    host: {
        "(window:resize)": "resize()"
    }
})
@View({
    template: `
        <div id="wrapper" style="height: inherit; width: inherit; border: 1px #000000;">
            <canvas id="graph" height="100%" width="100%" style="border: 1px #000000;"></canvas>
        </div>
    `
})
// Component controller
export class Graph {
    chart: LinearInstance;
    ys: Array<number> = [];
    xs: Array<number> = [];

    xMin: number;
    xMax: number;

    yMin: number;
    yMax: number;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    wrapper: JQuery;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("graph");
        this.wrapper = $("#wrapper");
        this.context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = this.wrapper.width();
        this.canvas.height = this.wrapper.height();
        console.log("set "+this.canvas.width + " by " + this.canvas.height);
        let data: LinearChartData = {
            labels: this.xs.map( (x) => new Date(x).toLocaleTimeString()),
            datasets: [{
                label: "Temp (c)",
                fillColor: "#FFFFFF",
                strokeColor: "#FF0000",
                data: this.ys
            }]
        };
        this.chart = new Chart(this.context).Line(data);
    }

    onChange() {
        console.log(this.xs);
        console.log(this.ys);

        let data: LinearChartData = {
            labels: this.xs.map( (x) => new Date(x).toLocaleTimeString()),
            datasets: [{
                label: "Temp (c)",
                fillColor: "#FFFFFF",
                strokeColor: "#FF0000",
                data: this.ys
            }]
        };
        this.chart = new Chart(this.context).Line(data);
    }
}