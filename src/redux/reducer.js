/* eslint-disable no-case-declarations */
import { changeWidgetArray, deleteNode, getNode, splitTheNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET, REORDER } from "./actions";


const initialLayoutState = {
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
    let current;
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

        case REORDER:
            const { source, destination, draggableId } = action.payload
            // if nothing should change return nothing
            if (!destination) return state;
            layoutCopy = { ...state.map };
            // if source and destination are both main
            if (source.droppableId === destination.droppableId && source.droppableId === 'main') {
                layoutCopy.mainContent = changeWidgetArray(source, destination, layoutCopy.mainContent)
            // else if S and D are not both main but are the same
            } else if (source.droppableId === destination.droppableId) {
                // start at first node
                current = layoutCopy.next
                while (current) {
                    // if node includes draggable
                    if (current.insideContent.map((item) => item.id).includes(draggableId)) {
                        // rearrange nodes insideContent
                        current.insideContent = changeWidgetArray(source, destination, current.insideContent)
                        return { ...state, map: {...layoutCopy} }
                    } else {
                        current = current.next
                    }
                }
            // else if S and D are NOT the same
            } else if (source.droppableId !== destination.droppableId) {
                let widget = null
                if (source.droppableId === 'main') {
                    widget = layoutCopy.mainContent.splice(source.index, 1)[0]
                }
                current = layoutCopy.next
                while (current && !widget) {
                    if (source.droppableId === current.id) {
                        widget = current.insideContent.splice(source.index, 1)[0]
                    } else {
                        current = current.next
                    }
                }
                if (destination.droppableId === 'main') {
                    layoutCopy.mainContent.splice(destination.index, 0, widget)
                    return { ...state, map: {...layoutCopy} }
                }
                current = layoutCopy.next
                while (current) {
                    if (destination.droppableId === current.id) {
                        current.insideContent.splice(destination.index, 0, widget)
                        return  { ...state, map: {...layoutCopy} }
                    } else {
                        current = current.next
                    }
                }
            }
            return state

        default:
            return state
    }
}

