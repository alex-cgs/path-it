export class Ship {
    constructor(x, y, angle, weights, biases, ctx) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.angle = angle;
        this.weights = weights;
        this.bias = biases;

        //ctx.closePath();
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
        
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
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
        ctx.rotate(this.angle);
        ctx.translate(this.x + 15, this.y);  
        ctx.beginPath();
        ctx.lineTo(this.x - 5, this.y - 10);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x - 5, this.y + 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.closePath();
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "orange";
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

    move() {
        if (this.rightPressed) {
            this.x += 5;
            requestAnimationFrame(this.move);
        }
    }

    keydown = (e) => {
        if (e.code === "ArrowRight") {
            this.rightPressed = true;
            console.log("pressed");
            console.log(this.x);
            this.x += this.speed;    
        }
    }

    keyup = (e) => {
        if (e.code == "ArrowRight") {
            this.rightPressed = false;
        }
    }

}


