import * as doc from './doc.js';
import * as nn from './net.js';
import * as play from './ship.js';

//import { sqrt } from './mathjs';

//import * as ops from './ops.js';

//console.log(Math.sqrt(-4).toString()) // 2i

var c = document.getElementById("Canv");

let ctx = c.getContext("2d");

let genArray = undefined;
let map;
var xObs = [];
var yObs = [];
let xEnd;
let yEnd;

let player1 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p1");
let player2 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p2");
let player3 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p3");
let player4 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p4");
let player5 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p5");
let player6 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p6");
let player7 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p7");
let player8 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p8");
let player9 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p9");
let player10 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p10");
var ships = [player1, player2, player3, player4, player5, player6, player7, player8, player9, player10];

var genFit = 0.004;

function draw(map, idx, fill, stroke) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j] == idx) {
                ctx.rect(48 * j, 48 * i, 48, 48);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    ctx.closePath();
}

function initdrawObs(map, idx, fill, stroke) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (map[i][j] == idx) {
                ctx.rect(48 * j, 48 * i, 48, 48);
                ctx.fill();
                ctx.stroke();

                xObs[xObs.length] = 48 * j;
                yObs[yObs.length] = 48 * i;
            }
        }
    }
    ctx.closePath();
}

function initdrawEnd(map, idx, fill, stroke) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == idx) {
                ctx.rect(48 * j, 48 * i, 48, 48);
                ctx.fill();
                ctx.stroke();

                xEnd = 48 * j;
                yEnd = 48 * i;
            }
        }
    }
    ctx.closePath();
}

function setup() {

    initdrawObs(map, 2, "#FC3448", "#8B0000"); //Draw obstacles

    draw(map, 1, "green", "darkgreen"); //Draw spawn point

    initdrawEnd(map, 3, "lightgrey", "grey"); //Draw end line
}

function initNN() {
    for (let i = 0; i < ships.length; i++) {
        ships[i].initiate();
        //console.log(ships[i].weights, ships[i].biases);
    }
}

function update() {

    ctx.clearRect(0, 0, c.width, c.height);
    draw(map, 2, "#FC3448", "#8B0000"); //Draw obstacles
    draw(map, 1, "green", "darkgreen"); //Draw spawn point
    draw(map, 3, "lightgrey", "grey"); //Draw end line


    for (let i = 0; i < ships.length; i++) {

        if (!ships[i].dead) {
            //ships[i].right(); Tests for speed when turning
            ships[i].x += ships[i].speed * Math.cos(ships[i].angle);
            ships[i].y += ships[i].speed * Math.sin(ships[i].angle);

            //console.log(ships[i].weights)
            let decision = ships[i].propagate(xEnd, yEnd);

            if (decision == 1) {
                ships[i].left()
            } 

            if (decision == 2) {
                ships[i].right()
            } 

            //Check if ship is dead
            for (let d = 0; d < xObs.length; d++) {

                //10 = ship's width, 58 = ship's width + object width (48)
                if ((ships[i].x * 2 > xObs[d] - 10 && ships[i].x * 2 < xObs[d] + 58 &&
                        ships[i].y * 2 > yObs[d] - 10 && ships[i].y * 2 < yObs[d] + 58) ||
                    (ships[i].x * 2 > 470 || ships[i].y * 2 > 470 || ships[i].x * 2 < 10 || ships[i].y * 2 < 10)) {

                    ships[i].dead = true;

                    ships[i].fit = genFit;

                    //console.log(ships[i].fit);
                    break;
                }

                if ((ships[i].x * 2 > xEnd - 10 && ships[i].x * 2 < xEnd + 58 &&
                        ships[i].y * 2 > yEnd - 10 && ships[i].y * 2 < yEnd + 58)) {

                    ships[i].dead = true;

                    ships[i].fit = genFit * 1000000;

                    //console.log(ships[i].fit);
                    break;
                console.log([i, ships[i].fit]);
                }
            }
        }
        ships[i].draw(ctx);
    }
    //console.log(player1.x, player1.y);
    genFit += 0.002;
    //console.log(1/genFit);
}

//select function, selects the individual with highest fit score or lowest distance to endpoint
function select(ships, xEnd, yEnd) {
    var bestFit = -1;
    var bestFitIdx = -1;
    var lowDist = +Infinity;
    var lowDistIdx = -1;
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].fit > bestFit) {
            bestFit = ships[i].fit;
            bestFitIdx = i;
        }
        if ((xEnd - ships[i].x) + (yEnd - ships[i].y) < lowDist) {
            lowDist = (ships[i].x - xEnd) ** 2 + (ships[i].y - yEnd) ** 2;
            lowDistIdx = i;
        }
    }
    if (bestFit > 0) {
        console.log(ships[bestFitIdx].id + " has been selected");
        ships[bestFitIdx].best = true
        return bestFitIdx;
    }
    console.log(ships[lowDistIdx].weights[0][0], ships[lowDistIdx].weights[0][1], ships[lowDistIdx].weights[0][2], ships[lowDistIdx].weights[0][3], ships[lowDistIdx].weights[0][4], ships[lowDistIdx].weights[0][8], "ufhsuif");
    ships[lowDistIdx].best = true
    return lowDistIdx;
}

function crossfit(best, ships, xSpawn, ySpawn, angle, xObs, yObs, id) {
    let newShips = [];
    for (let i = 0; i < ships.length; i++) {
        if (best != ships[i]) {
            let newShip = new play.Ship(xSpawn, ySpawn, angle, [], [], xObs, yObs, "p" + (i + 11).toString());
            console.log(best.weights);
            newShip.weights = doc.meanW(best.weights, ships[i].weights);
            console.log(newShip.weights)
            newShip.biases = doc.meanB(best.biases, ships[i].biases);
            newShips = [].concat(newShips, newShip);
        }
    }
    newShips = [].concat(best, newShips);
    return newShips;
}

function mutation(ships) {
    const mutationRate = 0.1; // define mutation rate as a constant
    for (let i = 0; i < ships.length; i++) {
        for (let j = 0; j < ships[i].weights.length; j++) {
            for (let k = 0; k < ships[i].weights[j].length; k++) {
                for (let l = 0; l < ships[i].weights[j][k].length; l++) {
                    if (Math.random() <= mutationRate && !ships[i].best) { // check if a mutation should occur
                        ships[i].weights[j][k][l] = (-1)**doc.getRandomInt(2) * Math.random(); // apply the mutation
                    }
                }
            }
        }
        for (let j = 0; j < ships[i].biases.length; j++) {
            for (let k = 0; k < ships[i].biases[j].length; k++) {
                if (Math.random() <= mutationRate) {
                    ships[i].biases[j][k] = (-1)**doc.getRandomInt(2) * Math.random();
                }
            }
        }
    }
}



//main function, for the whole game scenario, everything before is setting up
function nextGen() {
    return 0;
}


fetch('./maps/mapsDB.json')
	.then(response => response.json())
	.then(data => {

        // Do something with the JSON data
		genArray = data['Maps'];
		let obj = genArray[1]['arr'];
		map = Object.values(obj);

		setup();
		initNN();
        //console.log(player1);
		update(); //Needs 1 update to spawn ships and obstacles to the map. 
        //let best = select(ships);
        //let newShips = crossfit(best, ships, 0, 0, 0, [], []);
        //mutation(newShips);
        //console.log(newShips);
        console.log(ships);
        console.log([...ships[4].weights], "print0")    
        
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 13:
                    console.log([...ships[4].weights], "print1")
                    var bestIdx = select(ships, xEnd, yEnd);
                    console.log(ships[bestIdx], "heererere");
                    ships = crossfit(ships[bestIdx], ships, 12, 12, Math.PI / 4, xObs, yObs);
                    console.log(ships);

                    // FIX MUTATION DKl lkjvsnelkngsdlgndlsrgldnbgkjvlc
                    mutation(ships);
            }
            for (let i = 0; i < ships.length; i++) {
                switch (e.keyCode) {
                    case 37:
                        ships[i].left();
                        break;
                    case 38:
                        ships[i].move();
                        setInterval(update, 100);
                        break;
                    case 39:
                        ships[i].right();
                        break;
                    case 13:
                        ships[i].move()
                }
            }
        });

	})
	.catch(error => console.error(error));