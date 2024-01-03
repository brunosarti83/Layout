import Green from "./Components/Content/Green/Green"
import Purple from "./Components/Content/Purple/Purple"

export const widgets = {
    green: Green,
    purple: Purple
}

export const createNewNode = (args) => {
    const type = args[0]
    const side = args[1]
    const id = String(Math.floor(Math.random()*10000))
    return {
        id,
        type,
        side,
        insideContent: [],
        next: null
    }
}

export const changeWidgetArray = (source, destination, array) => {
    const widget = array[source.index]
    array.splice(source.index, 1)
    array.splice(destination.index, 0, widget)
    return array
}