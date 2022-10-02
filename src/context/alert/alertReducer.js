import {HIDE_ALERT, SHOW_ALERT} from "../types";

const handlers = {
    [SHOW_ALERT]: (state, {payload})=> ({...payload, visibility: 'visible'}),
    [HIDE_ALERT]: state => ({...state, visibility: 'invisible'}),
    DEFAULT: state => state
}

export const alertReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}