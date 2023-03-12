import * as sen from './sensor.js';

export class Ship {
    constructor(x, y, angle, weights, biases) {
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = angle;
        this.weights = weights;
        this.bias = biases;
        this.dead = false;
        this.fit = 0;
        this.sensor1 = new sen.Sensor(this.x, this.x, this.angle);
        this.sensor2 = new sen.Sensor(this.x, this.x, this.angle + Math.PI / 6);
        this.sensor3 = new sen.Sensor(this.x, this.x, this.angle - Math.PI / 6);
        this.sensor4 = new sen.Sensor(this.x, this.x, this.angle + Math.PI / 3);
        this.sensor5 = new sen.Sensor(this.x, this.x, this.angle - Math.PI / 3);
        this.capTouch = [0, 0, 0, 0, 0];
    }

    

    //OLD DESIGN, to do in the end just for aesthetics
    // spawn(ctx) {
    //     //this.move();
    //     ctx.closePath();
    //     ctx.rotate(this.angle);
    //     ctx.translate(this.x + 15, this.y);  
    //     ctx.beginPath();
    //     ctx.lineTo(this.x - 5, this.y - 10);
    //     ctx.lineTo(this.x, this.y);
    //     ctx.lineTo(this.x - 5, this.y + 10);
    //     ctx.lineTo(this.x + 15, this.y);
    //     ctx.strokeStyle = "orange";
    //     ctx.fillStyle = "orange";
    //     ctx.stroke();
    //     ctx.fill();
    // }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);  
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "orange";
        
        


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


        //SENSOR:
        
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

}


