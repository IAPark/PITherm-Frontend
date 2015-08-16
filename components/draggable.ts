/// <reference path="../typings/angular2/angular2.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import {Component, View} from 'angular2/angular2';

enum Direction{
    up_down,
    left_right
}

@Component({
    selector: 'draggable',
    properties: ['direction', "range", "value", "scale"],
    host: {
        "(^mousedown)": "dragging_start()"
    }
})
@View({
    template: `<div
                style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none; position: relative"
                unselectable="on"
                onselectstart="return false;"
                [style.left]="left"
                [style.top]="top">
                <ng-content></ng-content>
                </div>`

})
// Component controller
export class Draggable {
    dragging: boolean;

    private left: number;
    private top: number;

    private start_left: number;
    private start_top: number;

    range: number;
    value: number;
    scale: number
    direction: Direction;
    constructor() {
        this.dragging = false;
        if(!this.direction) {
            this.direction = Direction.left_right;
        }
        this.left = 0;
        this.top = 0;

        if(!this.value) {
            this.value = 0;
        }
        if(!this.scale) {
            this.scale = 1;
        }

        var component = this;
        $(document).mousemove((event: JQueryEventObject) => {component.update(event.pageX, event.pageY)});
        $(document).mouseup((event: JQueryEventObject) => {component.dragging_stop()})
    }

    update(mouseX: number, mouseY: number){
        this.value += mouseX - this.start_left;
        this.left = this.value;

        this.start_left = mouseX;
        this.start_top = mouseY;
    }

    dragging_start(){
        console.log("dragging was enabled");
        this.dragging = true
    }

    dragging_stop(){
        console.log("dragging was disabled");
        this.dragging = false
    }

}