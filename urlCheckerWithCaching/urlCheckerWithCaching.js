export const reportResponseMessage = (response, link) => {
    if (response.status === 200) {
        console.log(`SUCCESS Response 200: ${link}`)
    } else {
        console.log(`Failed to fetch URL: ${link}`)        
    }

    return Promise.resolve(response)
}

export const fetchAndCache = (link) => (
    fetch(link)
    .then((response) => reportResponseMessage(response, link))
    .catch((response) => reportResponseMessage(response, link))
)

export const urlCheckerWithCaching = (strHTML) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(strHTML, 'text/html')
    let urls = []

    // href attribute contains links in tags: <a>, <base>, <area> and <link>
    const tags = ["a", "base", "area", "link"]
    tags.forEach((tag) => {
        urls = [
            ...urls,
            ...doc.getElementsByTagName(tag)
        ]
    })

    Object.keys(urls).forEach((l) => {
        if (urls[l].href) {
            if (sessionStorage.getItem(urls[l].href)) {  // Cached after successful fetch - return
                return
            }

            sessionStorage.setItem([urls[l].href], true)  // Add to cache
            fetchAndCache(urls[l].href)
        }
    })
}

