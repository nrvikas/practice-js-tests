export const arrangeByKey = (arr=[], key='id') => {
    let result = {}

    arr.forEach((a) => {
        // Filter empty/non-objects/key-not-present items out
        // Accept only valid data
        if (a && typeof a === 'object' && a[key]) {
            result[a[key]] = [
                ...(result[a[key]] || []),
                { ...a }
            ]
        }
    })

    return result;
}
