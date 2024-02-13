/* eslint-disable no-case-declarations */
import { changeWidgetArray, deleteNode, getNode, splitTheNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET, REORDER_WIDGETS, SET_DRAG, CHANGE_LAYOUT } from "./actions";


const initialLayoutState = {
    isDragging: false,
    draggingId: null,
    targetId: null,
    map: {
        id: String(Math.floor(Math.random()*10000)),
        content: [],
        column: true,
        a: null,
        b: null
    }
}

export const rootReducer = (state=initialLayoutState, action) => {
    let layoutCopy;
    let newState;
    switch (action.type) {
        case ADD_TO_LAYOUT:
            layoutCopy = { ...state.map }
            newState = splitTheNode({ node: layoutCopy, ...action.payload })
            return { ...state, map: {...newState} }

        case REMOVE_FROM_LAYOUT:
            layoutCopy = { ...state.map };
            newState = deleteNode({ node: layoutCopy, ...action.payload })
            return { ...state, map: {...newState} }
        
        case ADD_WIDGET:
            const newWidget = {
                id: String(Math.floor(Math.random()*10000)),
                type: action.payload.widgetType
            }
            layoutCopy = { ...state.map };
            const nodeAdd = getNode(layoutCopy, action.payload.id)
            nodeAdd.content.push(newWidget)   
            return { ...state, map: {...layoutCopy} }

        case REMOVE_WIDGET:
            const { layoutId, widgetId } = action.payload
            layoutCopy = { ...state.map };
            const nodeDel = getNode(layoutCopy, layoutId)
            const filteredContent = nodeDel.content.filter((widget) => widget.id !== widgetId)
            nodeDel.content = filteredContent
            return { ...state, map: {...layoutCopy} }

        case REORDER_WIDGETS:
            const { source, destination, draggableId } = action.payload
            // if nothing should change return nothing
            if (!destination) return state;
            layoutCopy = { ...state.map };
            // if source and destination are both the same
            if (source.droppableId === destination.droppableId) {
                // get the node
                const nodeToChange = getNode(layoutCopy, destination.droppableId)
                nodeToChange.content = changeWidgetArray(source, destination, nodeToChange.content)
                return { ...state, map: {...layoutCopy} }  
            // else if S and D are NOT the same
            } else if (source.droppableId !== destination.droppableId) {
                const nodeFrom = getNode(layoutCopy, source.droppableId)
                const widget = nodeFrom.content[source.index]
                nodeFrom.content.splice(source.index, 1)
                const nodeTo = getNode(layoutCopy, destination.droppableId)
                nodeTo.content.splice(destination.index, 0, widget)
                return { ...state, map: {...layoutCopy} } 
            }
            return state

        case SET_DRAG:
            return { ...state, isDragging: action.payload}
        
        case CHANGE_LAYOUT:
            return state

        default:
            return state
    }
}

