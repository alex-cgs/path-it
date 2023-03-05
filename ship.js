export class Ship {
    constructor(x, y, angle, weights, biases) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.weights = weights;
        this.bias = biases;
    }

    spawn(ctx) {
        ctx.closePath();
        ctx.rotate(this.angle);
        ctx.translate(this.x + 15, this.y);  
        ctx.beginPath();
        ctx.lineTo(this.x - 5, this.y - 10);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x - 5, this.y + 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "orange";
        ctx.stroke();
        ctx.fill();

    }
}