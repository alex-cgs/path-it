import * as doc from "./doc.js";

export class NeuralNetwork {
    constructor(weights, biases) {
        this.weights = weights; //Set of 2 sets of weights, one is 9x6, other is 6x3
        this.biases = biases; //Set of 2 sets of biases, one is 1x6, other is 1x3
        this.decision = 0;
    }

    propagate(input) {
        weigthedA = doc.matMult(input, this.weigths[0]);
        finalA = doc.matAdd(weigthedA, this.biases[0]);

        newInput = doc.tanh(finalA);

        weigthedB = doc.matMult(newInput, this.weigths[1]);
        finalB = doc.matAdd(weigthedB, this.biases[1]);

        final = doc.tanh(finalB);

        decision = doc.argmax(finalB);

        return decision;
    }
}



// 9 -> 6 -> 3

//Input is 1x9, so mult by 9x6


// 9 mult by 9x6, the 6 mult by mult