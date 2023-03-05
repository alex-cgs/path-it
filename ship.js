export class Ship {
    constructor(x, y, angle, weights, biases) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.angle = angle;
        this.weights = weights;
        this.bias = biases;
        
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    

    spawn(ctx) {
        this.move();
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

    draw(ctx) {
        ctx.restore();
    }

    move() {
        if (this.rightPressed) {
            this.x += this.speed;
        }
    }

    keydown = (e) => {
        if (e.code === "ArrowRight") {
            this.rightPressed = true;
            console.log("pressed");
            console.log(this.x);
            this.x += this.speed;    
            this.draw();   
        }
    }

    keyup = (e) => {
        if (e.code == "ArrowRight") {
            this.rightPressed = false;
        }
    }

}


