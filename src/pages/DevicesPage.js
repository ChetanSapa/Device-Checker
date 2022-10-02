import React, {useContext, useEffect, useState} from "react";
import {DatabaseContext} from "../context/dataBase/databaseContext";
import {Loader} from "../components/Loader";
import PhonesList from "../components/PhonesList";

export const DevicesPage = () => {
    const {
        devices,
        filteredDevices,
        fetchDevices,
        loading,
        filterBy,
        isBorrowed,
        getBorrowed,
        returnBorrowed
    } = useContext(DatabaseContext)
    const [checked, setChecked] = useState(false)
    const optionsArr = (prop) => {
        let arr = Array.from(new Set(devices.map((d) => d[prop])))
        arr.unshift('Nezalezi')
        return arr
    }
    const setCheckbox = (borrowed, checked) => {
        isBorrowed(borrowed, checked)
        setChecked(checked)
    }
    useEffect(() => {
        fetchDevices()
    }, [])
    useEffect(()=>{},[])
    return (
        <div>
            <div className={'filter'}>
                <div className={'filter-item'}>
                    <label className={'filter-label'}>System</label>
                    <select className={'filter-select'} aria-label="System" id={'system'}>
                        {optionsArr('os').map((i) => <option
                            key={i}
                            value={i}
                            onClick={() => filterBy('os', i)}>{i}</option>)}
                    </select>
                </div>
                <div className={'filter-item'}>
                    <label className={'filter-label'}>Vyrobce</label>
                    <select className={'filter-select'} aria-label="Vyrobce" id={'producer'}>
                        {optionsArr('vendor').map((i) => <option
                            key={i}
                            value={i}
                            onClick={() => filterBy('vendor', i)}>{i}</option>)}
                    </select>
                </div>
                <div className={'filter-item'}>
                    <input
                        className={'filter-checkbox'}
                        type="checkbox" id={'present'}
                        checked={checked}
                        onChange={() => setCheckbox('borrowed', !checked)}
                    />
                    <label className={'filter-label'} htmlFor="present">Jen dostupne</label>
                </div>
                <div className={'filter-search'}>
                    <label className={'filter-label'} htmlFor="search">Hledat model</label>
                    <input className={'filter-search'} type="search" id={'search'}/>
                </div>
            </div>

            {loading ?
                <Loader/> :
                <PhonesList
                    devices={filteredDevices}
                    getBorrowed={getBorrowed}
                    returnBorrowed={returnBorrowed}
                />
            }
        </div>
    )
}