export function matMult(Mat1, Mat2) {
    result = new Array(Mat1.length);
    //Mat1's row length must be equal to Mat2's column length
    if (Mat1.length != Mat2[0].length) {
        return 0;
    }
    for (let i = 0; i < Mat1.length; i++) {
        for (let j = 0; j < Mat2[i].length; j++) {

        }
    }
}

export function tanh(x) {
    return Math.tanh(x);
}

export function tanhDer(x) {
    return 1 - TanH(x)**2;
}