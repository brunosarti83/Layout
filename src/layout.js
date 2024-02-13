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
    // get the parent node
    const parentNode = getParentNode(node, getId)
    // check wich node is target
    if (parentNode.a.id === getId) {
        if (!parentNode.b.a) {
            const granPaNode = getParentNode(node, parentNode.id)
            parentNode.column = granPaNode ? granPaNode.column : true
            parentNode.content = parentNode.b.content
        } else {
            parentNode.column = parentNode.b.column
        }
        parentNode.a = parentNode.b.a
        parentNode.b = parentNode.b.b
    } else {
        if (!parentNode.a.a) {
            const granPaNode = getParentNode(node, parentNode.id)
            parentNode.column = granPaNode ? granPaNode.column : true
            parentNode.content = parentNode.a.content
        } else {
            parentNode.column = parentNode.a.column
        }
        parentNode.b = parentNode.a.b
        parentNode.a = parentNode.a.a
    }
    return node
}

export const changeWidgetArray = (source, destination, array) => {
    const widget = array[source.index]
    array.splice(source.index, 1)
    array.splice(destination.index, 0, widget)
    return array
}

export const reorderLayout = (tree, dropId, position, dragId) => {
    const dropNode = getNode(tree, dropId)
    const dragNode = getNode(tree, dragId)
    const column = position === 'left' || position === 'right'
    dropNode.column = column
    let nodeA;
    let nodeB;
    if (position === 'top' || position === 'right') {
        nodeA = {...dragNode, id: String(Math.floor(Math.random()*10000)), column: column}
        nodeB = {...dropNode, id: String(Math.floor(Math.random()*10000)), column: column}
    } else {
        nodeB = {...dragNode, id: String(Math.floor(Math.random()*10000)), column: column}
        nodeA = {...dropNode, id: String(Math.floor(Math.random()*10000)), column: column}
    }
    dropNode.a = nodeA
    dropNode.b = nodeB
    const newTree = deleteNode({node:tree, getId:dragId})
    return newTree
}