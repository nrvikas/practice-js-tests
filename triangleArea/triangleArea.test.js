import {InvalidTriangleException, triangleArea, negativeErrorMsg, invalidSidesErrorMsg} from './triangleArea';

const getException = (a, b, c) => {
    try {
        triangleArea(a, b, c)
    } catch (exception) {
        return exception
    }
}

describe('triangleArea', () => {
    describe('-ve value', () => {
        it('will throw InvalidTriangleException if a side is negative', () => {
            expect(() => {triangleArea(-3, 4, 5)}).toThrow(InvalidTriangleException)
        });

        it('will frame appropriate error message', () => {
            const exception = getException(-3, 4, 5)
            expect(exception.message).toEqual(negativeErrorMsg)
        });
    });

    describe('invalid sides', () => {
        it('will throw InvalidTriangleException if sides are invalid', () => {
            expect(() => {triangleArea(3, 4, 15)}).toThrow(InvalidTriangleException)
        });

        it('will frame appropriate error message', () => {
            const exception = getException(3, 4, 15)
            expect(exception.message).toEqual(invalidSidesErrorMsg)
        });
    });

    describe('calculate area', () => {
        it('will provide correct results', () => {
            expect(triangleArea(3, 4, 5)).toEqual(6)
        });
    });
});

