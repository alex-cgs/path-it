import * as play from './ship.js';

/**
 * scalMult function
 * @param Mat the matrix to multiply
 * @param Scalar the scalar to multiply the matrix with
 * @returns the result of the multiplication
 */
export function scalMult(Mat, Scalar) {
  for (var i = 0; i < Mat.length; i++) {
    Mat[i] = Mat[i].map(function (x) { return x * Scalar; });
  }
  return Mat;
}

/**
 * softmax function
 * @param Mat 
 * @returns Mat affected by softmax
 */
export function softmax(Mat) {
  const result = new Array();
  const row = Mat;
  const rowExp = row.map((value) => Math.exp(value));
  const rowExpSum = rowExp.reduce((accumulator, value) => accumulator + value, 0);
  const rowSoftmax = rowExp.map((value) => value / rowExpSum);
  result.push(rowSoftmax);
  return result;
}

/**
 * softmaxDerivative function
 * @param Mat 
 * @returns the matrix affected by the derivative of softmax
 */
export function softmaxDerivative(Mat) {
  const result = new Array();
  for (let i = 0; i < Mat.length; i++) {
    const row = Mat[i];
    const rowExp = row.map((value) => Math.exp(value));
    const rowExpSum = rowExp.reduce((accumulator, value) => accumulator + value, 0);
    const rowSoftmax = rowExp.map((value) => value / rowExpSum);
    const rowDerivative = [];
    for (let j = 0; j < row.length; j++) {
      const kroneckerDelta = (i === j) ? 1 : 0;
      rowDerivative.push(rowSoftmax[j] * (kroneckerDelta - rowSoftmax[i]));
    }
    result.push(rowDerivative);
  }
  return result;
}

/**
 * tanh function
 * @param x the matrix to apply tanh to 
 * @returns the matrix x with tanh applied
 */
export function tanh(x) {
  let newmat = [];
  for (let i = 0; i < x.length; i++) {
    newmat[i] = Math.tanh(x[i]);
  }
  return newmat;
}

/**
 * tanhDer function
 * @param x the matrix to apply the derivative of tanh to 
 * @returns the matrix x with the derivative of tanh applied
 */
export function tanhDer(x) {
  return 1 - tanh(x) ** 2;
}

/**
 * matMult function
 * @param Mat1 the first, left matrix
 * @param Mat2 the second, right matrix
 * @returns Mat1 x Mat2
 */
export function matMult(Mat1, Mat2) {
  //console.log(Mat1, Mat2);
  // Check if the matrices can be multiplied

  // Create the result matrix
  const result = new Array(Mat1.length);
  for (let i = 0; i < result.length; i++) {
    result[i] = new Array(Mat2[0].length);
  }

  // Perform the matrix multiplication
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      let newval = 0;
      for (let k = 0; k < Mat1[i].length; k++) {
        newval += Mat1[i][k] * Mat2[k][j];
      }
      result[i][j] = newval;
    }
  }

  // Return the result matrix
  return result;
}

/**
 * matAdd function
 * @param Mat1 the first matrix 
 * @param Mat2 the second matrix
 * @returns Mat1 + Mat2 
 */
export function matAdd(Mat1, Mat2) {
  let newMat = new Array(Mat1[0].length);
  for (let i = 0; i < Mat1[0].length; i++) {
    newMat[i] = Mat1[0][i] + Mat2[i];
  }
  return newMat;
}

export function argmax(Mat) {
  let max = -Infinity;
  let idx = 0;
  for (let i = 0; i < Mat.length; i++) {
    if (Mat[i] > max) {
      max = Mat[i];
      idx = i;
    }
  }
  return idx;
}

/**
 * meanW function
 * @param Mat1 the first matrix
 * @param Mat2 the second matrix
 * @returns (Mat1 + Mat2) / 2
 * TO IMPROVE, NEWMAT!
 */
export function meanW(Mat1, Mat2) {

  /**
   * Assert mat1 size and mat2 too
   */

  var newMat = [
    [[
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ], [
      [], [], [], [], [], []
    ]],
    [[
      [], [], []
    ], [
      [], [], []
    ], [
      [], [], []
    ], [
      [], [], []
    ], [
      [], [], []
    ], [
      [], [], []
    ]],
  ];

  for (let i = 0; i < Mat1.length; i++) {
    for (let j = 0; j < Mat1[i].length; j++) {
      for (let k = 0; k < Mat1[i][j].length; k++) {
        newMat[i][j][k] = (Mat1[i][j][k] + Mat2[i][j][k]) / 2;
      }
    }
  }
  return newMat;
}

/**
 * meanB function
 * @param Mat1 the first matrix
 * @param Mat2 the second matrix
 * @returns (Mat1 + Mat2) / 2
 * TO IMPROVE, NEWMAT!
 */
export function meanB(Mat1, Mat2) {

  var newMat = [
    [],
    [],
  ];

  for (let i = 0; i < Mat1.length; i++) {
    for (let j = 0; j < Mat1[i].length; j++) {
      newMat[i][j] = (Mat1[i][j] + Mat2[i][j]) / 2;
    }
  }
  return newMat;
}

export function aStar(map, start) {
  const numRows = map.length;
  const numCols = map[0].length;
  const queue = [];
  const visited = new Set();
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right

  // Find the starting position (1) in the map
  let startRow, startCol;
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (map[i][j] === start) {
        startRow = i;
        startCol = j;
        break;
      }
    }
  }

  // Initialize the queue with the starting position
  queue.push({ row: startRow, col: startCol, steps: 0 });

  while (queue.length > 0) {
    const { row, col, steps } = queue.shift();

    // Check if the current position is the target (3)
    if (map[row][col] === 3) {
      return steps;
    }

    // Explore the neighboring cells
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      // Check if the new position is within the map boundaries
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols
      ) {
        // Check if the new position is not an obstacle (2 or 4) and has not been visited before
        if (
          (map[newRow][newCol] === 0 || map[newRow][newCol] === 3) &&
          !visited.has(`${newRow},${newCol}`)
        ) {
          queue.push({ row: newRow, col: newCol, steps: steps + 1 });
          visited.add(`${newRow},${newCol}`);
        }
      }
    }
  }

  // No path found
  return -1;
}

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 2, 2, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 2, 0, 2, 2, 0],
  [0, 2, 2, 2, 0, 2, 0, 0, 2, 0],
  [0, 2, 3, 2, 0, 2, 2, 2, 2, 0],
  [0, 2, 0, 2, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 2, 2, 2, 0],
  [1, 2, 0, 0, 0, 0, 0, 0, 2, 0]];

const shortestPath = aStar(map, 1);
console.log(`Shortest path length: ${shortestPath}`);



/**
 * getRandomInt function
 * @param max the maximum value to be returned 
 * @returns a float between 0 and max
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/*
let x = meanW(
  [
    //Weights 9x6 between 1st and 2nd layer
    [
        [2, 1, 3],
        [6, 5, 4],
    ],

    //Weights 6x3 between 2nd and 3rd layer
    [
        [5, 6, 45],
        [32, 1, 3],
    ]
], [
  //Weights 9x6 between 1st and 2nd layer
  [
      [4, 2, 6],
      [3213, 12, 321],
  ],

  //Weights 6x3 between 2nd and 3rd layer
  [
      [3121, 12, 999],
      [32312, 1214, 9210],
  ]
]
);


/*
let p1 = new play.Ship();
let p2 = new play.Ship();

p1.initiate();
p2.initiate();

console.log(p1, p2, meanW(p1.weights, p2.weights), "test meanW");


console.log(meanB([[1, 2], [3, 4]], [[122, 123], [124, 125]]), "test meanB");*/