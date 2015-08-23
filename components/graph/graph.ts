/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

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
        <div id="wrapper" style="height: inherit; width: inherit">
            <canvas id="graph" height="100%" width="100%"></canvas>
        </div>
    `
})
// Component controller
export class Graph {
    ys: Array<number> = [];
    xs: Array<number> = [];

    xMin: number;
    xMax: number;

    yMin: number;
    yMax: number;

    canvas: HTMLCanvasElement;
    content: CanvasRenderingContext2D;
    wrapper: JQuery;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("graph");
        this.wrapper = $("#wrapper");
        this.content = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        this.resize();
    }

    static get_min(array: Array<number>): number {
        if(array.length < 1) {
            return
        }
        var min = array[0];

        array.forEach((element) => {
            if(element < min) {
                min = element
            }
        });
        return min;
    }

    static get_max(array: Array<number>): number {
        if(array.length < 1) {
            return
        }
        var max = array[0];

        array.forEach((element) => {
            if(element > max) {
                max = element
            }
        });
        return max;
    }

    resize() {
        this.canvas.width = this.wrapper.width();
        this.canvas.height = this.wrapper.height();
        console.log("set "+this.canvas.width + " by " + this.canvas.height);
        this.draw()

    }

    draw() {
        let width = this.canvas.width;
        let height = this.canvas.height;

        let xOffset = 0 - this.xMin;
        let yOffset = 0 - this.yMin;

        let xScale = width/(xOffset + this.xMax);
        let yScale = height/(yOffset + this.yMax);

        if (!isFinite(yScale)) {
            yScale = 1;
        }

        if (!isFinite(xScale)) {
            xScale = 1;
        }

        this.content.clearRect(0, 0, width, height);

        this.content.beginPath();
        if (1>this.xs.length || 1>this.ys.length) {
            return;
        }


        this.content.moveTo(
            (this.xs[0] + xOffset)*xScale,
            (this.ys[0] + yOffset)*yScale
        );
        for (var i=1; i<this.xs.length && i<this.ys.length; i+=1) {
            this.content.lineTo(
                (this.xs[i] + xOffset)*xScale,
                (this.ys[i] + yOffset)*yScale
            );

            /*console.log("drawing to " +
                (this.xs[i] + xOffset)*xScale + ',' +
                (this.ys[i] + yOffset)*yScale
            )*/

        }

        this.content.stroke();
    }

    onChange() {
        console.log(this.xs);
        console.log(this.ys);

        if(this.xs != null) {
            this.xMin = Graph.get_min(this.xs);
            this.xMax = Graph.get_max(this.xs);
        }

        if(this.ys != null) {
            this.yMax = Graph.get_max(this.ys);
            this.ys.forEach((element, i, ys) => {
                ys[i] = this.yMax - element;
            });

            this.yMax = Graph.get_max(this.ys);
            this.yMin = Graph.get_min(this.ys);
            console.log("min y = "+this.yMin)

        }
        this.draw()
    }
}