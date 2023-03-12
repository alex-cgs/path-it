export class Sensor {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    draw(ctx, x, y, angle) {
        ctx.save();

        ctx.moveTo(x * 2, y * 2);

        ctx.lineTo(x*2 + 75*Math.cos(angle), y*2 + 75*Math.sin(angle) );

        ctx.restore();

        ctx.stroke();
    }
}