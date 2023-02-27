export function scalMult(Mat, Scalar) {
    for (var i = 0; i < Mat.length; i++) {
        Mat[i] = Mat[i].map(function(x) { return x * Scalar; });
    }
    return Mat;
}

export function softmax(Mat) {
    const result = new Array();
    for (let i = 0; i < Mat.length; i++) {
      const row = Mat[i];
      const rowExp = row.map((value) => Math.exp(value));
      const rowExpSum = rowExp.reduce((accumulator, value) => accumulator + value, 0);
      const rowSoftmax = rowExp.map((value) => value / rowExpSum);
      result.push(rowSoftmax);
    }
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
    return Math.tanh(x);
}

export function tanhDer(x) {
    return 1 - tanh(x)**2;
}

export function matMult(Mat1, Mat2) {
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