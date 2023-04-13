import * as play from './ship.js';

export function scalMult(Mat, Scalar) {
    for (var i = 0; i < Mat.length; i++) {
        Mat[i] = Mat[i].map(function(x) { return x * Scalar; });
    }
    return Mat;
}

export function softmax(Mat) {
    const result = new Array();
    const row = Mat;
    const rowExp = row.map((value) => Math.exp(value));
    const rowExpSum = rowExp.reduce((accumulator, value) => accumulator + value, 0);
    const rowSoftmax = rowExp.map((value) => value / rowExpSum);
    result.push(rowSoftmax);
    return result;
}

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


export function tanh(x) {
  let newmat = [];
  for (let i = 0; i < x.length; i++) {
    newmat[i] = Math.tanh(x[i]);
  }
  return newmat;
}

export function tanhDer(x) {
    return 1 - tanh(x)**2;
}

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

/** Does the mean for weights (3D -> 2D arrays) */
export function meanW(Mat1, Mat2) {

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
      for (let k = 0; k < Mat1[i][j].length; k++){
        newMat[i][j][k] = (Mat1[i][j][k] + Mat2[i][j][k]) / 2;
      }
    }
  }
  console.log(newMat, "hererer");
  return newMat;
}

/** Does the mean for weights (2D -> 1D arrays) */
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

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


//console.log(matMult([[2], [1], [3], [4]], [[5, 3, 4, 1]]));
//console.log(matAdd([1, 2, 3, 4], [1, 2, 3, 4]))
//console.log(mean([[2], [1], [3], [4]], [[10], [4], [1], [29]]));

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

let p1 = new play.Ship();
let p2 = new play.Ship();

p1.initiate();
p2.initiate();

console.log(p1, p2, meanW(p1.weights, p2.weights), "test meanW");


console.log(meanB([[1, 2], [3, 4]], [[122, 123], [124, 125]]), "test meanB");