//import * as doc from 'doc';

map = Array(10).fill(Array(10).fill(1));

function ScalMult(Mat, Scalar) {
    for (var i = 0; i < Mat.length; i++) {
        Mat[i] = Mat[i].map(function(x) { return x * Scalar; });
    }
    return Mat;
}

console.log(ScalMult(map, 10));