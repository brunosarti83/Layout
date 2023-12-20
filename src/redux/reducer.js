/* eslint-disable no-case-declarations */
import { createNewNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET } from "./actions";


const initialLayoutState = {
    map: {
        mainContent: [{
            id: String(Math.floor(Math.random()*10000)),
            type: "green"
        }],
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

        default:
            return state
    }
}

