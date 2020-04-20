export const commonElements = (arr=[]) => {
    // - Loop through and create a map or element:count pairs
    // - In the same loop create another array(result) with current highest frequency

    let result = []
    let frequencyMap = {}
    let highestFreq = 0

    arr.forEach((a) => {
        if (!(a in frequencyMap)) {  // First encounter
            frequencyMap[a] = 1
        } else {
            frequencyMap[a] += 1  // Increment occurance count
        }

        if (frequencyMap[a] < highestFreq) { // Not suitable candidate for result currently (occurance < highestFreq)
            return
        }

        if (frequencyMap[a] === highestFreq) { // Is a candidate - add it to result
            result.push(a)
            return
        }

        // New highest frequency discovered - flush previous result and start framing new result
        highestFreq = frequencyMap[a]
        result = [a]
    })

    return result
}
