export const positiveIntegerDivisor = (num) => {
    if (num === 0) {
        return [num]
    }

    let result = []
    const isEven = num % 2 === 0
    const maxDivisor = Math.floor(num/2)
    const maxIter = isEven ? maxDivisor - 1 : maxDivisor // Only loop until n/2 - 1 if even

    Array.from({ length: maxIter }, (_, i) => i+1).forEach((a) => {
        if (num % a === 0) {
            result.push(a)
        }
    })

    // n/2 will always divide if even number
    result = isEven ? [
        ...result,
        maxDivisor,
        num
    ] : [
        ...result,
        num
    ]

    return result
}
