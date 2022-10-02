import React, {useContext, useState}from "react";
import {DatabaseContext} from "../context/dataBase/databaseContext";
import {useNavigate} from "react-router-dom";
import {AlertContext} from "../context/alert/alertContext";

export const CreateDevice = () => {
    const {addDevice, devices} = useContext(DatabaseContext)
    const alert = useContext(AlertContext)
    const navigate = useNavigate()
    let osArr = Array.from(new Set(devices.map((d) => d.os)))
    let produceArr = Array.from(new Set(devices.map((d) => d.vendor)))
    const [formData, setForm] = useState({
        code: '',
        vendor: produceArr[0],
        model:'',
        os:osArr[0],
        osVersion: '',
        image:'',
    })

    const changeHandler = (event) => {
        setForm({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }

    const submitHandler = (event)=> {
        event.preventDefault()
        let el = devices.find(item=>item.code === formData.code)
        console.log(el, formData.code)
        if (formData.code.trim() && el===undefined && formData.model.trim()){
            console.log(el, formData.code)
            addDevice(formData).then(()=>{
                alert.show('New device was added!', 'success')
                navigate('/device-page')
                setForm('')
            }).catch((e)=>{
                console.log(e)
                alert.show('Something went wrong!', 'danger')
            })
            alert.show('New device was added!', 'success')
            setForm('')
        } else {
            alert.show('Type device unique code and model, please!', 'warning')
        }
    }
    return (
        <div>
            <div className={'container col-md-6 mt-3 mb-3'}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Kódové označení
                            (identifikátor)</label>
                        <input
                            name='code'
                            type="text"
                            required={true}
                            className="form-control"
                            id="exampleInputLogin1"
                            aria-describedby="emailHelp"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Výrobce</label>
                        <select
                            name='vendor'
                            value={devices.vendor}
                            required={true}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={changeHandler}>
                            {produceArr.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Model</label>
                        <input
                            name='model'
                            type="text"
                            required={true}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Operační systém</label>
                        <select
                            name='os'
                            value={devices.os}
                            required={true}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={changeHandler}>
                            {osArr.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Verze operačního systému</label>
                        <input
                            name='osVersion'
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={changeHandler}
                            placeholder={'Nepovinný údaj'}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Obrázek(URL)</label>
                        <input
                            name='image'
                            type="url"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={changeHandler}
                            placeholder={'Nepovinný údaj'}
                        />
                    </div>
                    <button type="submit" className="btn btn-success" onClick={submitHandler}>Submit</button>
                </form>
            </div>
        </div>
    )
}