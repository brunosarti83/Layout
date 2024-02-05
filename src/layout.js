import Green from "./Components/Widgets/Green/Green"
import Purple from "./Components/Widgets/Purple/Purple"

export const widgets = {
    green: Green,
    purple: Purple
}

export const createNewNode = (columnOrRow) => {
    const id = String(Math.floor(Math.random()*10000))
    return {
        id,
        content: [],
        column: columnOrRow === "column",
        a: null,
        b: null
    }
}

export const changeWidgetArray = (source, destination, array) => {
    const widget = array[source.index]
    array.splice(source.index, 1)
    array.splice(destination.index, 0, widget)
    return array
}