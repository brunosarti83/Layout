
export const ADD_TO_LAYOUT = 'ADD_TO_LAYOUT'
export const REMOVE_FROM_LAYOUT = 'REMOVE_FROM_LAYOUT'
export const ADD_WIDGET = 'ADD_WIDGET'
export const REMOVE_WIDGET = 'REMOVE_WIDGET'
export const CHANGE_WIDGETS = 'CHANGE_WIDGETS'
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT'
export const SWITCH_DIRECTION = "SWITCH_DIRECTION"


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

export const addWidget = (layoutId, widgetType, index) => {
    return {
        type: ADD_WIDGET,
        payload: { layoutId, widgetType, index }
    }
}

export const removeWidget = (layoutId, widgetId) => {
    return {
        type: REMOVE_WIDGET,
        payload: { layoutId, widgetId }
    }
}

export const changeWidgets = (widgetId, parentId, dropId, position) => {
    return {
        type: CHANGE_WIDGETS,
        payload: { widgetId, parentId, dropId, position }
    }
}

export const changeLayout = (dropId, position, dragId) => {
    return {
        type: CHANGE_LAYOUT,
        payload: { dropId, position, dragId }
    }
}

export const changeDirection = (layoutId) => {
    return {
        type: SWITCH_DIRECTION,
        payload: { layoutId }
    }
}

