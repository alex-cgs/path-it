export class Sensor {
    constructor(x, y, angle, xObs, yObs) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.hit = 0;
        this.xObs = xObs;
        this.yObs = yObs;
    }

    draw(ctx, x, y, angle) {
        ctx.save();

        ctx.moveTo(x * 2, y * 2);

        ctx.lineTo(x*2 + 75*Math.cos(angle), y*2 + 75*Math.sin(angle) );

        ctx.restore();

        ctx.stroke();

        this.x = x*2 + 75*Math.cos(angle);

        this.y = y*2 + 75*Math.sin(angle);

        //console.log(this.x);
    }

    /** 
     * Add collision for sensors, when hitting an object, return 1, otherwise return 0
     * To myself: object length = 48
     */
    collision() {
        for (let i = 0; i < this.xObs.length; i++) {

            if ((this.x > this.xObs[i] && this.x < this.xObs[i] + 48 &&
                this.y > this.yObs[i] && this.y < this.yObs[i] + 48) ||
                (this.x > 480 || this.y > 480 || this.x < 0 || this.y < 0)) {
                
                this.hit = 1;
                return 1;
            }
            else {
                this.hit = 0;
                return 0;
            } 
        }
        return 0;
    }
}