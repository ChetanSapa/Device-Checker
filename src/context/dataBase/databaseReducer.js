import {
    ADD_DEVICE,
    AUTH_DATA,
    FETCH_DEVICES,
    FILTERED_DEVICES,
    GET_BORROWED,
    LOGOUT,
    REMOVE_DEVICE, RETURN_BORROWED,
    SHOW_LOADER
} from "../types";

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [AUTH_DATA]: (state, {payload}) => ({...state, authData: payload}),
    [LOGOUT]: (state) => ({...state, authData: {}}),
    [FETCH_DEVICES]: (state, {payload}) => ({...state, devices: payload, loading: false}),
    [ADD_DEVICE]: (state, {payload}) => ({
        ...state,
        devices: [...state.devices, payload],
        loading: false
    }),
    [REMOVE_DEVICE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    [GET_BORROWED]: (state, {payload}) => ({
        ...state,
        filteredDevices: [...state.filteredDevices.map(d => {
            if (d.id === payload.id) {
                return payload
            }
            return d
        })],
        loading: false
    }),
    [RETURN_BORROWED]: (state, {payload}) => ({
        ...state,
        filteredDevices: [...state.filteredDevices.map(d => {
            if (d.id === payload.id) {
                return payload
            }
            return d
        })],
        loading: false
    }),
    [FILTERED_DEVICES]:
        (state, {payload}) => ({
            ...state,
            filteredDevices: payload
        }),
    DEFAULT:
        state => state
}

export const databaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}