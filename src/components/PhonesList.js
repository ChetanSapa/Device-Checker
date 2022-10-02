import React, {useEffect} from 'react';

const PhonesList = ({devices, getBorrowed, returnBorrowed}) => {
    const changeDateFormat = (linuxDateFormat) => {
      return  new Date(linuxDateFormat).toLocaleString()
    }
    useEffect(()=>{

    },[devices])
    return (
        <div className={'device-list'}>
            {devices.map((d) => <div className={'device-item'} key={d.id}>
                <div className={'device-img-container'}>
                    <img className={'device-img'}
                         src={d.image ? d.image : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXhjNmUmsCOw1CSmjbn0fEjiiG3ONT7blew&usqp=CAU`}
                         alt=""/>
                    {d.borrowed ? <div
                        className={'borrowed'}> Vypůjčeno: {d.borrowed.user.name} {changeDateFormat(d.borrowed.date)}</div> : <></>}
                </div>
                <div className={'device-model'}>{d.model}</div>
                <div className={'device-vendor'}>{d.vendor}</div>
                <div className={'device-os-ver'}>{d.os}&nbsp;/&nbsp;{d.osVersion}</div>
                {d.borrowed ?
                    <button className={'getBtn'} onClick={()=>{returnBorrowed(d)}}>VRÁTIT</button>
                    : <button className={'getBtn'} onClick={()=>{getBorrowed(d)}}>PŮJČIT</button> }

            </div>)}
        </div>
    );
};

export default PhonesList;