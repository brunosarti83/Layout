

export const createNewNode = (type) => {
    const id = Math.random() * 1000000
    return {
        id,
        type,
        insideContent: [],
        next: null
    }
}