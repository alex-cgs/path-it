import * as doc from './doc.js';
import * as nn from './net.js';
import * as play from './ship.js';

//import { sqrt } from './mathjs';

//import * as ops from './ops.js';

//console.log(Math.sqrt(-4).toString()) // 2i

var c = document.getElementById("Canv");

let ctx = c.getContext("2d");

let genArray;
let map;
var xObs = [];
var yObs = [];
let xStart;
let yStart;
let genAngle;
let xEnd;
let yEnd;
let ships;
let efficiency;
let effArr;
let bestIdx;
let selectedFit;
let leaderboard;
let numbDead = 2;

var genFit = 1;

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

function initNN(ships) {
    for (let i = 0; i < ships.length; i++) {
        ships[i].initiate();
        //console.log(ships[i].weights, ships[i].biases);
    }
}


let player1 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p1");
let player2 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p2");
let player3 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p3");
let player4 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p4");
let player5 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p5");
/**
let player6 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p6");
let player7 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p7");
let player8 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p8");
let player9 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p9");
let player10 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p10"); */
ships = [player1];


function update(xStart, yStart, genAngle) {

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
                if ((ships[i].x * 2 > xObs[d] - 5 && ships[i].x * 2 < xObs[d] + 53 &&
                        ships[i].y * 2 > yObs[d] - 5 && ships[i].y * 2 < yObs[d] + 53) ||
                    (ships[i].x * 2 > 475 || ships[i].y * 2 > 475 || ships[i].x * 2 < 5 || ships[i].y * 2 < 5)) {

                    ships[i].dead = true;

                    numbDead += 1;

                    ships[i].fit = 10000 * 460800 * genFit / ((Math.abs(ships[i].x - xEnd)**2 + Math.abs(ships[i].y - yEnd)**2))**2;

                    break;
                }

                if ((ships[i].x * 2 > xEnd - 5 && ships[i].x * 2 < xEnd + 53 &&
                        ships[i].y * 2 > yEnd - 5 && ships[i].y * 2 < yEnd + 53)) {

                    ships[i].dead = true;

                    numbDead += 1;

                    ships[i].fit = (1 / genFit) * 10000000000;
                    break;
                }
            }
        }
        ships[i].draw(ctx);
        ships[i].move(ctx);
    }
    //console.log(player1.x, player1.y);
    genFit += 0.002;
    if (genFit > 2.5 || numbDead == ships.length) {
        numbDead = 0;
        genFit = 1;
        for (let i = 0; i < ships.length; i ++) {
            if (!ships[i].dead) {
                ships[i].fit = 0
            }
        }
        var bestIdx = select(ships, xEnd, yEnd);
        
        console.log(ships, "next");

        leaderboard = [ships[bestIdx]];

        for (let i = 0; i < ships.length; i ++) {
            if (i != bestIdx) {
                leaderboard.push(ships[i]);
            }
        }

        

        effArr = [];

        for (let i = 0; i < leaderboard.length; i ++) {
            if (leaderboard[i].fit > 1000000) {
                effArr.push(12 - 0.5*effArr.length);
            }
            else {
                effArr = [].concat(effArr, (Math.tanh(leaderboard[i].fit / 1400) * 10));
            }
        }

        ships = crossover(ships[bestIdx], ships, xStart, yStart, genAngle, xObs, yObs);

        let mut = mutation(ships.slice(1));

        efficiency = 0;

        for (let i = 0; i < ships.length; i++) {
            ships[i].draw(ctx);
            ships[i].move;
            if (i == 0) {
                efficiency += (1 - mut) * Math.tanh(effArr[i]);
            }
            else {
                efficiency += (mut / 4) * Math.tanh(effArr[i]);
            }
        }

        console.log("mutation rate: ", mut, mut, mut);

        console.log("efficiency: ", efficiency);
        
        console.log("efficiency array: ", effArr);
    }
    //console.log(1/genFit);
}

//select function, selects the individual with highest fit score or lowest distance to endpoint
function select(ships, xEnd, yEnd) {
    for (let i = 0; i < ships.length; i++) {
        ships[i].dead = true;
    }
    var bestFit = -1;
    var bestFitIdx = -1;
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].fit > bestFit) {
            bestFit = ships[i].fit;
            bestFitIdx = i;
        }
    }
    console.log(ships[bestFitIdx].id + " has been selected");
    selectedFit = [ships[bestFitIdx].fit]
    ships[bestFitIdx].best = true;
    ships[bestFitIdx].id = "currentBest"
    bestIdx = bestFitIdx;
    return bestFitIdx;
}

function crossover(best, ships, xSpawn, ySpawn, angle, xObs, yObs, id) {
    let newShips = [];
    for (let i = 0; i < ships.length; i++) {
        if (best != ships[i]) {
            let newShip = new play.Ship(xSpawn, ySpawn, angle, [], [], xObs, yObs, "p" + (i).toString());
            newShip.weights = doc.meanW(best.weights, ships[i].weights);
            newShip.biases = doc.meanB(best.biases, ships[i].biases);
            newShips = [].concat(newShips, newShip);
        }
    }
    best = new play.Ship(xSpawn, ySpawn, angle, best.weights, best.biases, xObs, yObs, "currentBest");
    newShips = [].concat(best, newShips);
    return newShips;
}

function mutation(ships) {
    const mutationRate = (1 - Math.tanh(selectedFit / 300)) / 2 + 0.07; // define mut rate as a constant
    for (let i = 0; i < ships.length; i++) {
        for (let j = 0; j < ships[i].weights.length; j++) {
            for (let k = 0; k < ships[i].weights[j].length; k++) {
                for (let l = 0; l < ships[i].weights[j][k].length; l++) {
                    if (Math.random() <= mutationRate && !ships[i].best) { // check if a mut should occur
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
    return mutationRate
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

        let mapIdx = 4;

		let obj = genArray[mapIdx]['arr'];
		map = Object.values(obj);

        let xStart = genArray[mapIdx]['xStart'];
        let yStart = genArray[mapIdx]['yStart'];
        let genAngle = genArray[mapIdx]['angle'];

		setup();
        
        let p1 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p1");
        let p2 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p2");
        let p3 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p3");
        let p4 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p4");
        let p5 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
        /**
        let player6 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p6");
        let player7 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p7");
        let player8 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p8");
        let player9 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p9");
        let player10 = new play.Ship(12, 12, Math.PI / 4, [0], [0], xObs, yObs, "p10"); */
        ships = [p1, p2, p3, p4, p5];


		initNN(ships);
        //console.log(player1);
		update(xStart, yStart, genAngle); //Needs 1 update to spawn ships and obstacles to the map. 
        //let best = select(ships);
        //let newShips = crossover(best, ships, 0, 0, 0, [], []);
        //mutation(newShips);
        //console.log(newShips);
        
        document.addEventListener('keydown', function(e) {
            switch (e.keyCode) {
                case 13:
                    genFit = 1;
                    for (let i = 0; i < ships.length; i ++) {
                        if (!ships[i].dead) {
                            ships[i].fit = 0
                        }
                    }
                    var bestIdx = select(ships, xEnd, yEnd);
                    ships = crossover(ships[bestIdx], ships, xStart, yStart, genAngle, xObs, yObs);
 
                    let mut = mutation(ships.slice(1));
            }
            for (let i = 0; i < ships.length; i++) {
                switch (e.keyCode) {
                    case 37:
                        mapIdx -= 1;
                        obj = genArray[mapIdx]['arr'];
		                map = Object.values(obj);
                        break;
                    case 38:
                        ships[i].move();
                        ships[i].dead = false;
                        const myInterval = setInterval(update, 50, xStart, yStart, genAngle);
                        break;
                    case 39:
                        mapIdx += 1;
                        break;
                    case 40:
                        ships[i].dead = true;
                        update(xStart, yStart, genAngle);
                        clearInterval(myInterval);
                        break;
                    case 13:
                        ships[i].move()
                }
            }
        });

	})
	.catch(error => console.error(error));