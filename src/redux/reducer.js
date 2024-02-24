/* eslint-disable no-case-declarations */
import { deleteNode, getNode, reorderLayout, reorderWidgets, splitTheNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET, CHANGE_WIDGETS, CHANGE_LAYOUT, SWITCH_DIRECTION, SET_DRAGGING } from "./actions";


const initialLayoutState = {
    isDragging: null,
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
    let newLayout;
    switch (action.type) {
        case ADD_TO_LAYOUT:
            layoutCopy = { ...state.map }
            newLayout = splitTheNode({ node: layoutCopy, ...action.payload })
            return { ...state, map: {...newLayout} }

        case REMOVE_FROM_LAYOUT:
            layoutCopy = { ...state.map };
            newLayout = deleteNode({ node: layoutCopy, ...action.payload })
            return { ...state, map: {...newLayout} }
        
        case ADD_WIDGET:
            const newWidget = {
                id: String(Math.floor(Math.random()*10000)),
                type: action.payload.widgetType
            }
            layoutCopy = { ...state.map };
            const nodeAdd = getNode(layoutCopy, action.payload.layoutId)
            nodeAdd.content.splice(action.payload.index, 0, newWidget)  
            return { ...state, map: {...layoutCopy} }

        case REMOVE_WIDGET:
            layoutCopy = { ...state.map };
            const fromNode = getNode(layoutCopy, action.payload.layoutId)
            const filteredContent = fromNode.content.filter((widget) => widget.id !== action.payload.widgetId)
            fromNode.content = filteredContent
            return { ...state, map: {...layoutCopy} }

        case CHANGE_WIDGETS:
            layoutCopy = { ...state.map };
            newLayout = reorderWidgets(
                layoutCopy,
                action.payload.widgetId, 
                action.payload.parentId, 
                action.payload.dropId, 
                action.payload.position
                )
            return { ...state, map: {...newLayout} }
        
        case CHANGE_LAYOUT:
            let { dropId, position, dragId } = action.payload
            if (dragId === dropId) {
                return state
            }
            layoutCopy = { ...state.map };
            newLayout = reorderLayout(layoutCopy, dropId, position, dragId)
            return { ...state, map: {...newLayout}}

        case SWITCH_DIRECTION:
            layoutCopy = { ...state.map };
            const targetNode = getNode(layoutCopy, action.payload.layoutId)    
            const bool = targetNode.column
            targetNode.column = !bool
            return { ...state, map: {...layoutCopy} }

        case SET_DRAGGING:
            return {...state, isDragging: action.payload}
            
        default:
            return state
    }
}

