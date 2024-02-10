
export const ADD_TO_LAYOUT = 'ADD_TO_LAYOUT'
export const REMOVE_FROM_LAYOUT = 'REMOVE_FROM_LAYOUT'
export const ADD_WIDGET = 'ADD_WIDGET'
export const REMOVE_WIDGET = 'REMOVE_WIDGET'
export const REORDER = 'REORDER'


export const addToLayout = (getId, columnOrRow) => {
    return {
        type: ADD_TO_LAYOUT,
        payload: { getId, columnOrRow }
    }
}

export const removeFromLayout = (getId) => {
    return {
        type: REMOVE_FROM_LAYOUT,
        payload: { getId }
    }
}

export const addWidget = (id, widgetType) => {
    return {
        type: ADD_WIDGET,
        payload: { id, widgetType }
    }
}

export const removeWidget = (layoutId, widgetId) => {
    return {
        type: REMOVE_WIDGET,
        payload: { layoutId, widgetId }
    }
}

export const reorder = (result) => {
    return {
        type: REORDER,
        payload: result
    }
}