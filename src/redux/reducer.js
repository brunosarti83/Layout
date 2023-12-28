/* eslint-disable no-case-declarations */
import { changeWidgetArray, createNewNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET, REORDER } from "./actions";


const initialLayoutState = {
    map: {
        mainContent: [
            {
            id: String(Math.floor(Math.random()*10000)),
            type: "green"
        }, {
            id: String(Math.floor(Math.random()*10000)),
            type: "purple"
        }, {
            id: String(Math.floor(Math.random()*10000)),
            type: "purple"
        }
    ],
        next: null
    }
}

export const rootReducer = (state=initialLayoutState, action) => {
    let layoutCopy;
    let current;
    switch (action.type) {
        case ADD_TO_LAYOUT:
            const newNode = createNewNode(action.payload)
            layoutCopy = { ...state.map }
            current = layoutCopy
            while (current.next) {
                current = current.next
            }
            current.next = newNode
            return { ...state, map: {...layoutCopy} }

        case REMOVE_FROM_LAYOUT:
            layoutCopy = { ...state.map };
            current = layoutCopy;
            while (current) {
            if (current?.next?.id === action.payload) {
                current.next = current.next.next;
                break
            }
            current = current.next;
            }
            return { ...state, map: {...layoutCopy} }
        
        case ADD_WIDGET:
            const newWidget = {
                id: String(Math.floor(Math.random()*10000)),
                type: action.payload.widgetType
            }
            layoutCopy = { ...state.map };
            // check if add is on mainContent
            if (action.payload.layoutId === 'main') {
                layoutCopy.mainContent.push(newWidget)
            } else {
                // track the node that should hold the widget
                current = layoutCopy;
                while (current) {
                if (current.id === action.payload.id) {
                    current.insideContent.push(newWidget);
                    break
                }
                current = current.next;
                }
            }
            return { ...state, map: {...layoutCopy} }

        case REMOVE_WIDGET:
            layoutCopy = { ...state.map };
            // check if delete is from mainContent
            if (action.payload.layoutId === 'main') {
                layoutCopy.mainContent = layoutCopy.mainContent.filter(widget => widget.id !== action.payload.widgetId);
            } else {
                // track the node holding the widget and delete it
                current = layoutCopy;
                while (current) {
                if (current.id === action.payload.layoutId) {
                    current.insideContent = current.insideContent.filter(widget => widget.id !== action.payload.widgetId);
                    break
                }
                current = current.next;
                }
            }
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

