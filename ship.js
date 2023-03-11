export class Ship {
    constructor(x, y, angle, weights, biases, ctx) {
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.angle = angle;
        this.weights = weights;
        this.bias = biases;
        this.dead = false;
    }

    

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
        ctx.save();

        ctx.moveTo(this.x * 2, this.y * 2);

        ctx.lineTo(this.x*2 + 75*Math.cos(this.angle), this.y*2 + 75*Math.sin(this.angle) );

        ctx.restore();

        ctx.stroke();
    }

    move() {
        this.speed = 4;
    }

    left() {
        this.angle -= Math.PI / 15;
    }

    right() {
        this.angle += Math.PI / 15;
    }

}


