import * as doc from './doc.js';
import * as play from './ship.js';

var c = document.getElementById("Canv");

let ctx = c.getContext("2d");

ctx.font = "bold 30px Arial";
ctx.fillStyle = "white";
ctx.fillText("Select a Map", 150, 240);

let genArray;
let map;
var xObs = [];
var yObs = [];
let xEnd;
let yEnd;
let ships;
let efficiency;
let gennum = 0;
let effarr;
let effrec = [];
let selectedFit;
let mut;
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


ships = [];

function updateGeneration() {
    const genElement = document.getElementById('gen');
    const generation = gennum;
    genElement.textContent = 'Gen: ' + generation;
}

function updateEfficiency() {
    const effElement = document.getElementById('eff');
    const eff = efficiency;
    effElement.textContent = 'Efficiency: ' + eff;
}

function updateMutationRate() {
    const mutElement = document.getElementById('mut');
    const mutationRate = mut;
    mutElement.textContent = 'Mutation Rate: ' + mutationRate;
}


function updateValues() {
    updateGeneration();
    updateEfficiency();
    updateMutationRate();
}

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

                    var newX = (ships[i].x - (ships[i].x % 24)) / 24;

                    var newY = (ships[i].y - (ships[i].y % 24)) / 24;

                    let newmap = [new Array(10), new Array(10), new Array(10), new Array(10), new Array(10),
                    new Array(10), new Array(10), new Array(10), new Array(10), new Array(10)];

                    for (let g = 0; g < map.length; g++) {
                        for (let h = 0; h < map.length; h++) {
                            newmap[g][h] = map[g][h];
                            if (g == newY && h == newX) {
                                newmap[g][h] = 4
                            }
                        }
                    }

                    newmap[newY][newX] = 4;

                    numbDead += 1;

                    ships[i].fit = 1 - (doc.aStar(newmap, 4) / doc.aStar(map, 1))

                    if (ships[i] < -0.09) {
                        ships[i].initiate();
                    }

                    console.log(ships[i].id, ships[i].fit);

                    newmap = [];

                    break;
                }

                if ((ships[i].x * 2 > xEnd - 5 && ships[i].x * 2 < xEnd + 53 &&
                    ships[i].y * 2 > yEnd - 5 && ships[i].y * 2 < yEnd + 53)) {

                    ships[i].dead = true;

                    numbDead += 1;

                    ships[i].fit = 1;
                    break;
                }
            }
        }
        ships[i].draw(ctx);
        ships[i].move(ctx);
    }
    // console.log(ships[0].x, ships[0].y);
    genFit += 0.002;
    if (genFit > 3.5 || numbDead == ships.length) {
        gennum += 1;
        numbDead = 0;
        genFit = 1;
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].dead) {
                var newX = (ships[i].x - (ships[i].x % 24)) / 24;

                var newY = (ships[i].y - (ships[i].y % 24)) / 24;

                let newmap = [new Array(10), new Array(10), new Array(10), new Array(10), new Array(10),
                new Array(10), new Array(10), new Array(10), new Array(10), new Array(10)];

                for (let g = 0; g < map.length; g++) {
                    for (let h = 0; h < map.length; h++) {
                        newmap[g][h] = map[g][h];
                        if (g == newY && h == newX) {
                            newmap[g][h] = 4
                        }
                    }
                }

                newmap[newY][newX] = 4;

                ships[i].fit = 1 - (doc.aStar(newmap, 4) / doc.aStar(map, 1))

                if (ships[i] < -0.09) {
                    ships[i].initiate();
                }

                console.log(ships[i].id, ships[i].fit);

                newmap = [];
            }
        }
        effarr = [];

        for (let i = 0; i < ships.length; i++) {
            effarr.push(ships[i].fit);
        }

        var bestIdx = select(ships, xEnd, yEnd);

        console.log(ships, "next");

        ships = crossover(ships[bestIdx], ships, xStart, yStart, genAngle, xObs, yObs);

        mut = mutation(ships.slice(1));

        efficiency = 0;

        let flag = false;

        for (let i = 0; i < ships.length; i++) {
            ships[i].draw(ctx);
            ships[i].move;
            if (effarr[i] == selectedFit && flag == false) {
                efficiency += selectedFit * (3 / 4);
                flag = true;
            }
            else {
                efficiency += effarr[i] / (4 * (ships.length - 1));
            }
        }

        effrec.push(efficiency);

        if (gennum == 50) {
            downloadFile();
        }

        updateValues();

        console.log("mutation rate: ", mut);

        console.log("efficiency: ", efficiency, effrec);
    }
    //console.log(1/genFit);
}

//select function, selects the individual with highest fit score or lowest distance to endpoint
function select(ships) {
    var bestFit = -1;
    var bestFitIdx = -1;
    for (let i = 0; i < ships.length; i++) {
        if (ships[i].fit > bestFit) {
            bestFit = ships[i].fit;
            bestFitIdx = i;
        }
    }
    console.log(ships[bestFitIdx].id + " has been selected");
    selectedFit = [ships[bestFitIdx].fit];
    ships[bestFitIdx].id = "currentBest";
    return bestFitIdx;
}

function crossover(best, ships, xSpawn, ySpawn, angle, xObs, yObs) {
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
    let mutationRate = (1 - selectedFit) / 2.5;
    if (mutationRate < 0.03) {
        mutationRate += 0.02;
    }
    for (let i = 0; i < ships.length; i++) {
        for (let j = 0; j < ships[i].weights.length; j++) {
            for (let k = 0; k < ships[i].weights[j].length; k++) {
                for (let l = 0; l < ships[i].weights[j][k].length; l++) {
                    if (Math.random() <= mutationRate && !ships[i].best) {
                        ships[i].weights[j][k][l] = (-1) ** doc.getRandomInt(2) * Math.random();
                    }
                }
            }
        }
        for (let j = 0; j < ships[i].biases.length; j++) {
            for (let k = 0; k < ships[i].biases[j].length; k++) {
                if (Math.random() <= mutationRate) {
                    ships[i].biases[j][k] = (-1) ** doc.getRandomInt(2) * Math.random();
                }
            }
        }
    }
    return mutationRate
}

addEventListener("DOMContentLoaded", (event) => {
    var a = document.getElementById("0");
    var b = document.getElementById("1");
    var e = document.getElementById("2");
    var d = document.getElementById("3");
    var f = document.getElementById("4");
    var dwn = document.getElementById("dwn");

    var mapbtn = document.getElementById("mapbtn");

    a.addEventListener("click", changeMapIndex);
    b.addEventListener("click", changeMapIndex);
    e.addEventListener("click", changeMapIndex);
    d.addEventListener("click", changeMapIndex);
    f.addEventListener("click", changeMapIndex);
    dwn.addEventListener("click", downloadFile);

    mapbtn.addEventListener("click", loadMap);
});

function changeMapIndex() {
    console.log("pressed");
    window.mapIdx = parseInt(this.id);
    console.log(mapIdx);
    main(mapIdx, undefined);
}

function loadMap() {
    let mapval = document.getElementById("mapcontent").value;
    main(0, mapval);
}

function downloadFile() {
    var obj = { "ships": ships, "eff": effrec };
    var filename = "download.json";
    var blob = new Blob([JSON.stringify(obj)], { type: 'text/plain' });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
}

function main(mapIdx, maplay) {
    fetch('script/maps/mapsDB.json')
        .then(response => response.json())
        .then(data => {

            /**
             * Do this into a big function call and canvas.rect
             */

            // Do something with the JSON data
            genArray = data['Maps'];

            /** roundabout-1 */

            let obj = genArray[mapIdx]['arr'];

            if (maplay == undefined) {
                map = Object.values(obj);
            }
            else {
                map = JSON.parse(maplay);
            }

            console.log(map);

            let xStart = genArray[mapIdx]['xStart'];
            let yStart = genArray[mapIdx]['yStart'];
            let genAngle = genArray[mapIdx]['angle'];

            console.log(doc.aStar(map, 1));

            setup();

            let p1 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p1");
            let p2 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p2");
            let p3 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p3");
            let p4 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p4");
            let p5 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
            let p6 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
            let p7 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
            let p8 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
            let p9 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");
            let p10 = new play.Ship(genArray[mapIdx]['xStart'], genArray[mapIdx]['yStart'], genArray[mapIdx]['angle'], [0], [0], xObs, yObs, "p5");

            ships = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];


            initNN(ships);
            update(xStart, yStart, genAngle); //Needs 1 update to spawn ships and obstacles to the map. 

            document.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case 13:
                        gennum += 1;
                        genFit = 1;
                        numbDead = 0;
                        for (let i = 0; i < ships.length; i++) {
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

        let par = document.getElementById('cap');
        par.innerHTML = "Press UP key to begin"
}