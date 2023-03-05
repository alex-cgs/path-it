import * as doc from './doc.js';


var c = document.getElementById("Canv");

let ctx = c.getContext("2d");
ctx.beginPath();

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

map[0][0] = 1;

map[4][4] = 2;
map[5][4] = 2;
map[4][5] = 2;
map[5][5] = 2;



function draw(map, idx, fill, stroke) {
    ctx.closePath();
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
}
function draw2(map, idx, fill, stroke) {
    let ctx2 = c.getContext("2d");
    ctx2.fillStyle = fill;
    ctx2.strokeStyle = stroke;
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            if (map[i][j] == idx) {
                ctx2.rect(48 * j, 48 * i, 48, 48);
                ctx2.fill();
                ctx2.stroke();
            }
        }
    }
}

console.log(map);


draw(map, 1, "green", "darkgreen");

draw(map, 2, "#FC3448", "#8B0000");

//console.log(doc.softmax([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));