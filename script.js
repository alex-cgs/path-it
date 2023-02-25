//import * as doc from 'doc';

map = Array(10).fill(Array(10).fill(1));

function scalMult(Mat, Scalar) {
    for (var i = 0; i < Mat.length; i++) {
        Mat[i] = Mat[i].map(function(x) { return x * Scalar; });
    }
    return Mat;
}

function matrixMultiplication(Mat1, Mat2) {
    // Check if the matrices can be multiplied
    if (Mat1[0].length !== Mat2.length) {
      throw "Uncompatible matrices!";
    }
  
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


console.log(MatMult([[3, 2, 1], [13, 3, 19], [3, 9, 10]], [[2, 8, 9], [1, 9, 0], [8, 8, 2]]));