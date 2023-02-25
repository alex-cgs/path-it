export function MatMult(Mat1, Mat2) {
    result = new Array();
    //Mat1's row length must be equal to Mat2's column length
    if (Mat1.length != Mat2[0].length) {
        return 0;
    }
}

export function TanH(x) {
    return Math.tanh(x);
}

export function TanHder(x) {
    return 1 - TanH(x)**2;
}