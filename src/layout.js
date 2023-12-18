import Green from "./Components/Content/Green/Green"
import Purple from "./Components/Content/Purple/Purple"

export const widgets = {
    green: Green,
    purple: Purple
}

export const createNewNode = (type) => {
    const id = Math.random() * 1000000
    return {
        id,
        type,
        insideContent: [],
        next: null
    }
}