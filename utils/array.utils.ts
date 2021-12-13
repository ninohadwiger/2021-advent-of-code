
export class ArrayUtils {

    static create2DArray<T>(nrOfRows: number, nrOfCols: number, filler: T): T[][] {
        const arr: T[][] = [];
        for (let row = 0; row < nrOfRows; ++row) {
            arr[row] = [];
            for (let column = 0; column < nrOfCols; ++column) {
                arr[row][column] = filler;
            }
        }
        return arr;
    }

    static flipMatrix = matrix => (
        matrix[0].map((column, index) => (
            matrix.map(row => row[index])
        ))
    );

    static rotateMatrix = matrix => (
        ArrayUtils.flipMatrix(matrix.reverse())
    );

    static rotateMatrixCounterClockwise = matrix => (
        ArrayUtils.flipMatrix(matrix).reverse()
    );

    static flipMatrixCounterClockwise = matrix => (
        ArrayUtils.rotateMatrix(matrix).reverse()
    );

    static createAndFillMatrix<T>(height: number, width: number, filler: T): T[][] {
        return Array.from(Array(height), _ => Array(width).fill(filler));
    }

    static createAndFillArray<T>(length: number, filler: T): T[] {
        return new Array(length).fill(filler);
    }

    // reducers
    static sum = (prev: number, curr: number) => prev + curr;
    static multiply = (prev: number, curr: number) => prev * curr;
    static max = (max: number, curr: number) => Math.max(max, curr);

}