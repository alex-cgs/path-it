import * as sen from './sensor.js';
import * as doc from "./doc.js";

export class Ship {
    constructor(x, y, angle, weights, biases, xObs, yObs, id) {
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = angle;
        this.weights = weights;
        this.biases = biases;
        this.dead = false;
        this.fit = 0;
        this.xObs = xObs;
        this.yObs = yObs
        this.sensor1 = new sen.Sensor(this.x, this.x, this.angle, this.xObs, this.yObs, 40);
        this.sensor2 = new sen.Sensor(this.x, this.x, this.angle + Math.PI / 6, this.xObs, this.yObs, 40);
        this.sensor3 = new sen.Sensor(this.x, this.x, this.angle - Math.PI / 6, this.xObs, this.yObs, 40);
        this.sensor4 = new sen.Sensor(this.x, this.x, this.angle + Math.PI / 3, this.xObs, this.yObs, 40);
        this.sensor5 = new sen.Sensor(this.x, this.x, this.angle - Math.PI / 3, this.xObs, this.yObs, 40);
        this.capTouch = [this.sensor1.hit, this.sensor2.hit, this.sensor3.hit, this.sensor4.hit, this.sensor5.hit];
        this.id = id;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        if (this.id == "currentBest") {
            ctx.strokeStyle = "purple";
            ctx.fillStyle = "purple";
        }
        else {
            ctx.strokeStyle = "orange";
            ctx.fillStyle = "orange";
        }

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        //SENSOR:
        this.sensor1.draw(ctx, this.x, this.y, this.angle);
        this.sensor2.draw(ctx, this.x, this.y, this.angle + Math.PI / 6);
        this.sensor3.draw(ctx, this.x, this.y, this.angle - Math.PI / 6);
        this.sensor4.draw(ctx, this.x, this.y, this.angle + Math.PI / 3);
        this.sensor5.draw(ctx, this.x, this.y, this.angle - Math.PI / 3);


        this.capTouch = [this.sensor5.collision(), this.sensor3.collision(), this.sensor1.collision(), this.sensor2.collision(), this.sensor4.collision()];
        //this.capTouch = [this.sensor1.hit, this.sensor2.hit, this.sensor3.hit, this.sensor4.hit, this.sensor5.hit];
    }

    move() {
        this.speed = 1;
    }

    left() {
        this.angle -= Math.PI / 20;
    }

    right() {
        this.angle += Math.PI / 20;
    }


    initiate() {
        this.weights = [
            //Weights 9x6 between 1st and 2nd layer
            [
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()]
            ],

            //Weights 6x3 between 2nd and 3rd layer
            [
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],
                [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()]
            ]
        ];

        this.biases = [
            //Set 1x6 of biases
            [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()],

            //Set 1x3 of biases
            [(-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random(), (-1) ** doc.getRandomInt(2) * Math.random()]
        ]
    }

    propagate(xEnd, yEnd) {

        let W1 = this.weights[0];
        let W2 = this.weights[1];
        let B1 = this.biases[0];
        let B2 = this.biases[1];

        let input = [[].concat(this.x / 240, this.y / 240, this.capTouch, xEnd / 480, yEnd / 480)];
        let weigthedA = doc.matMult(input, W1);
        let finalA = doc.matAdd(weigthedA, B1);
        let newInput = [doc.tanh(finalA)];
        let weigthedB = doc.matMult(newInput, W2);
        let finalB = doc.matAdd(weigthedB, B2);
        let final = doc.tanh(finalB);
        let decision = doc.argmax(final);
        return decision;
    }
}


