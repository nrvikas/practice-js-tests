import {isNullOrEmpty} from './isNullOrEmpty';


describe('isNullOrEmpty', () => {
    describe('positive null/empty checks', () => {
        // empty checks
        it('will compute null value is null or empty', () => {
            expect(isNullOrEmpty(null)).toBe(true);
        });

        it('will compute "" is null or empty', () => {
            expect(isNullOrEmpty("")).toBe(true);
        });

        it('will compute a number value is null or empty', () => {
            expect(isNullOrEmpty(106)).toBe(true);
        });

        it('will compute undefined value is null or empty', () => {
            expect(isNullOrEmpty(undefined)).toBe(true);
        });

        it('will compute boolean true is null or empty', () => {
            expect(isNullOrEmpty(true)).toBe(true);
        });

        it('will compute boolean false is null or empty', () => {
            expect(isNullOrEmpty(false)).toBe(true);
        });

        it('will compute object is null or empty', () => {
            expect(isNullOrEmpty({})).toBe(true);
        });

        it('will compute function is null or empty', () => {
            expect(isNullOrEmpty(()=>{})).toBe(true);
        });        
    });

    describe('with inputs not null or empty', () => {
        // Non-empty checks
        it('will compute "a" is not empty', () => {
            expect(isNullOrEmpty("a")).toBe(false);
        });

        it('will compute new-line or escape character is not empty', () => {
            expect(isNullOrEmpty('\n')).toBe(false);
        });

        it('will compute string "null" is not empty', () => {
            expect(isNullOrEmpty("null")).toBe(false);
        });

        it('will compute string "undefined" is not empty', () => {
            expect(isNullOrEmpty("undefined")).toBe(false);
        });
    })
});
