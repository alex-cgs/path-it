import * as doc from './doc.js';

import * as play from './ship.js'

var c = document.getElementById("Canv");

let ctx = c.getContext("2d");

let map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


let spawnX = 0;
let spawnY = 0;


map[spawnX][spawnY] = 1;

map[4][4] = 2;
map[5][4] = 2;
map[4][5] = 2;
map[5][5] = 2;

map[9][9] = 3;





function draw(map, idx, fill, stroke) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            if (map[i][j] == idx) {
                ctx.rect(48 * j, 48 * i, 48, 48);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    ctx.closePath();
}

console.log(map);


draw(map, 2, "#FC3448", "#8B0000"); //Draw obstacles

draw(map, 1, "green", "darkgreen"); //Draw spawn point

draw(map, 3, "lightgrey", "grey"); //Draw end line





//To myself: to spawn ship, coordinates:
// rownb * iter + 3 for its x position
// colnb * iter + 12 for its y position
// (because canvas can't draw right, or i can't)

//0° std (3, 12)

//BEWARE IF ROTATE: 90° clockwise (1.5708rad, down): do x = x, y = -y
//(std: 3, -12)

//270° clockwise (4.71239rad, down): x = -(24 - 3) or -iter -21 and becomes vertical,
// y = y or 12 and becomes horizontal 
//(std -21, 12)

//180° (pi, or 3.14159rad,) 
//(std -21, -12)


let player1 = new play.Ship(12, 12, 0, [0], [0]);

let player2 = new play.Ship(36, 36, 0, [0], [0]);

var ships = [player1, player2];


//player1.spawn(ctx);


console.log(player1.x);

//let y = new play.Ship(0, 0, 0, [0], [0]);


document.addEventListener('keydown', function(e) {
    for (let i = 0; i < ships.length; i++) {
        switch (e.keyCode) {
            case 37:
                ships[i].left();
                break;
            case 38:
                ships[i].move();
                break;
            case 39:
                ships[i].right();
                break;
        }
    }
});


function update() {
    ctx.clearRect(0, 0, c.width, c.height);
    draw(map, 2, "#FC3448", "#8B0000"); //Draw obstacles
    draw(map, 1, "green", "darkgreen"); //Draw spawn point
    draw(map, 3, "lightgrey", "grey"); //Draw end line
    for (let i = 0; i < 2; i++) {
        if (!ships[i].dead) {
            //ships[i].right(); Tests for speed when turning
            ships[i].x += ships[i].speed * Math.cos(ships[i].angle);
            ships[i].y += ships[i].speed * Math.sin(ships[i].angle);
            ships[i].draw(ctx);
        }
    }
    console.log(player1.angle);
}

setInterval(update, 15);





//y.spawn(ctx);

//console.log(doc.softmax([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));