export default async function fetcher<JSON = any>(
    input: NodeJS.fetch.RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

// const fetcher = url => fetch(url).then(r => r.json())
//
// export default fetcher
