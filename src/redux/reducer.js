/* eslint-disable no-case-declarations */
import { deleteNode, getNode, reorderLayout, reorderWidgets, splitTheNode } from "../layout";
import { ADD_TO_LAYOUT, REMOVE_FROM_LAYOUT, ADD_WIDGET, REMOVE_WIDGET, CHANGE_WIDGETS, CHANGE_LAYOUT } from "./actions";


const initialLayoutState = {
    map: {
        id: '0001',//String(Math.floor(Math.random()*10000)),
        content: [],
        column: true,
        a: {
            id: '0002',
            content: [],
            column: false,
            a: {
                id:'0003',
                content:[],
                column: false,
                a:null,
                b:null,
            },
            b: {
                id:'0004',
                content:[],
                column: false,
                a: null,
                b: null,
            }
        },
        b: {
            id:'0005',
            content:[],
            column:true,
            a:null,
            b:null,
        }
    }
}

export const rootReducer = (state=initialLayoutState, action) => {
    let layoutCopy;
    let newState;
    switch (action.type) {
        case ADD_TO_LAYOUT:
            layoutCopy = { ...state.map }
            newState = splitTheNode({ node: layoutCopy, ...action.payload })
            console.log(newState)
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
            const nodeAdd = getNode(layoutCopy, action.payload.layoutId)
            nodeAdd.content.splice(action.payload.index, 0, newWidget)  
            return { ...state, map: {...layoutCopy} }

        case REMOVE_WIDGET:
            layoutCopy = { ...state.map };
            const nodeDel = getNode(layoutCopy, action.payload.layoutId)
            const filteredContent = nodeDel.content.filter((widget) => widget.id !== action.payload.widgetId)
            nodeDel.content = filteredContent
            return { ...state, map: {...layoutCopy} }

        case CHANGE_WIDGETS:
            layoutCopy = { ...state.map };
            const newLayout = reorderWidgets(
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
            newState = reorderLayout(layoutCopy, dropId, position, dragId)
            return { ...state, map: {...newState}}

        default:
            return state
    }
}

