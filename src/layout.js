import Green from "./Components/Widgets/Green/Green"
import Purple from "./Components/Widgets/Purple/Purple"

export const widgets = {
    "green": Green,
    "purple": Purple
}

export const dndTypes = {
    WIDGET_BOX: 'WIDGET_BOX',
    WIDGET: 'WIDGET',
    LAYOUT: 'LAYOUT' 
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

export const reorderLayout = (tree, dropId, position, dragId) => {
    // search for nodes
    const dropNode = getNode(tree, dropId)
    const dragNode = getNode(tree, dragId)
    // column is true if moving drag to either left or right dropArea
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
    console.log(dropNode)
    return tree
    const newTree = deleteNode({node:tree, getId:dragId})
    return newTree
}

export const reorderWidgets = (tree, widgetId, parentId, dropId, position) => {
    // if source and destination are both the same
    if (parentId === dropId) {
        // get the node
        const nodeToChange = getNode(tree, dropId)
        const widget = {...nodeToChange.content.find((w) => w.id === widgetId)}
        const newContent = nodeToChange.content.filter((w) => w.id !== widgetId)
        newContent.splice(position, 0, widget)
        nodeToChange.content = [...newContent]
        return tree  
    // else if S and D are NOT the same
    } else if (parentId !== dropId) {
        const nodeFrom = getNode(tree, parentId)
        const widget = {...nodeFrom.content.find((w) => w.id === widgetId)}
        nodeFrom.content = nodeFrom.content.filter((w) => w.id !== widgetId)
        const nodeTo = getNode(tree, dropId)
        nodeTo.content.splice(position, 0, widget)
        return tree
    }
    return tree
}