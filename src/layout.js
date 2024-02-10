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

export const getNode = (node, getId) => {
    if (!node) return null
    if (node.id === getId) {
       return node
    }
    const nodeA = getNode(node.a, getId)
    if (nodeA) return nodeA
    const nodeB = getNode(node.b, getId)
    if (nodeB) return nodeB
    return null
}

export const splitTheNode = ({ node, getId, columnOrRow }) => {
    const toSplit = getNode(node, getId)
    toSplit.column = columnOrRow === 'column'
    const nodeA = createNewNode(columnOrRow)
    const nodeB = createNewNode(columnOrRow)
    nodeA.content = [...toSplit.content]
    toSplit.content = []
    toSplit.a = nodeA
    toSplit.b = nodeB
    return node
}

export const getParentNode = (node, getId) => {
    if (!node.a) return null
    if (node.a.id === getId || node.b.id === getId) {
       return node
    }
    const nodeA = getParentNode(node.a, getId)
    if (nodeA) return nodeA
    const nodeB = getParentNode(node.b, getId)
    if (nodeB) return nodeB
    return null
}

export const deleteNode = ({ node, getId }) => {
    const parentNode = getParentNode(node, getId)
    if (parentNode.a.id === getId) {
        parentNode.content = [...parentNode.b.content]
    } else {
        parentNode.content = [...parentNode.a.content]
    }
    parentNode.column = getParentNode(node, parentNode.id)?.column || true
    parentNode.a = null
    parentNode.b = null
    return node
}

export const changeWidgetArray = (source, destination, array) => {
    const widget = array[source.index]
    array.splice(source.index, 1)
    array.splice(destination.index, 0, widget)
    return array
}