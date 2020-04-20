export const negativeErrorMsg = "No side of the  triangle should be -ve"
export const invalidSidesErrorMsg = "Sum of two sides of a triangle should be greater than the third"

// Exception class
export class InvalidTriangleException extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidTriangleException";
  }
}

const isNegative = (x) => x < 0
const invalidSides = (a, b, c) => (a+b<c || b+c<a || c+a<b)

export const triangleArea = (a, b, c) => {
    if (isNegative(a) || isNegative(b) || isNegative(c)) {
        throw new InvalidTriangleException(negativeErrorMsg)
    }

    if (invalidSides(a, b, c)) {
        throw new InvalidTriangleException(invalidSidesErrorMsg)
    }

    const perimeter = (a+b+c)/2
    return Math.sqrt(perimeter * (perimeter-a) * (perimeter-b) * (perimeter-c))
}
