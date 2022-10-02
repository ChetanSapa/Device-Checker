import React, {useReducer} from 'react';
import {DatabaseContext} from "./databaseContext";
import {databaseReducer} from "./databaseReducer";
import axios from 'axios'
import {
    ADD_DEVICE,
    AUTH_DATA,
    FETCH_DEVICES,
    FILTERED_DEVICES,
    GET_BORROWED,
    LOGOUT,
    REMOVE_DEVICE,
    RETURN_BORROWED,
    SHOW_LOADER
} from "../types";

const url = `https://js-test-api.etnetera.cz/api/v1`

export const DatabaseState = ({children}) => {
    const initialState = {
        devices: [],
        filteredDevices: [],
        newDevice: {},
        authData: {
            token: null
        },
        loading: false,
    }
    const [state, dispatch] = useReducer(databaseReducer, initialState)

    const headers = {
        'Content-Type': 'application/json',
        'Auth-Token': `${state.authData.token}`,
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const login = async (formData) => {
        showLoader()
        const res = await axios.post(`${url}/login`, formData, {headers})
        const payload = res.data
        dispatch({type: AUTH_DATA, payload})
    }
    const logout = () => {
        dispatch({type: LOGOUT})
    }

    const fetchDevices = async () => {
        showLoader()
        const res = await axios.get(`${url}/phones`, {headers})
        const payload = res.data
        dispatch({type: FETCH_DEVICES, payload})
        dispatch({type: FILTERED_DEVICES, payload})
    }
    const addDevice = async newDevice => {
        showLoader()
        try {
            const res = await axios.post(`${url}/phones`, newDevice, {headers})
            const payload = {
                newDevice: res.data
            }
            dispatch({type: ADD_DEVICE, payload})
        } catch (e) {
            throw new Error(e.message)
        }
        console.log(newDevice)
    }
    const removeDevice = async id => {
        showLoader()
        await axios.delete(`${url}/phones/${id}.json`)
        dispatch({
            type: REMOVE_DEVICE,
            payload: id,
        })
    }
    const getBorrowed = async device => {
        showLoader()
        try {
            const res = await axios.post(`${url}/phones/${device.id}/borrow`, {device}, {headers})
            const payload = res.data
            dispatch({type: GET_BORROWED, payload})
        } catch (e) {
            throw new Error(e.message)
        }
    }
    const returnBorrowed = async device => {
        showLoader()
        try {
            const res = await axios.post(`${url}/phones/${device.id}/return`, {device}, {headers})
            const payload = res.data
            dispatch({type: RETURN_BORROWED, payload})
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const filterBy = (field, value, devices = state.devices, filteredDevices = state.filteredDevices) => {
        const filteredData = (data) => [...data].filter(item => item[field] === value)
        if (field === 'os' && value === 'ANDROID') {
            console.log(field)
            dispatch({
                type: FILTERED_DEVICES,
                payload: filteredData(filteredDevices)
            })
        } else if (value === 'Nezalezi') {
            dispatch({
                type: FILTERED_DEVICES,
                payload: devices
            })
        } else {
            dispatch({
                type: FILTERED_DEVICES,
                payload: filteredData(devices),
            })
        }
    }
    const isBorrowed = (field, value, data = state.devices) => {
        if (value === false) {
            dispatch({
                type: FILTERED_DEVICES,
                payload: data
            })
        } else {
            const filteredData = [...data].filter(item => !item[field])
            dispatch({
                type: FILTERED_DEVICES,
                payload: filteredData
            })
        }
    }
    return (
        <DatabaseContext.Provider value={{
            login,
            logout,
            addDevice,
            removeDevice,
            showLoader,
            fetchDevices,
            filterBy,
            isBorrowed,
            getBorrowed,
            returnBorrowed,
            loading: state.loading,
            authData: state.authData,
            devices: state.devices,
            filteredDevices: state.filteredDevices,
            state
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}