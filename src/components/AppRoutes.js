import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {DevicesPage} from "../pages/DevicesPage";
import {LoginForm} from "../pages/LoginForm";
import {DatabaseContext} from "../context/dataBase/databaseContext";
import {CreateDevice} from "../pages/CreateDevice";

const AppRoutes = () => {
    const {authData} = useContext(DatabaseContext)
    if (authData.token) {
        return (
            <Routes>
                <Route path={'/device-list'} exact element={<DevicesPage/>}/>
                <Route path={'/create-device'} element={<CreateDevice/>}/>
                <Route path="*" element={<Navigate to ="/device-list" />}/>
            </Routes>
        );
    }
    return (
        <div>
            <Routes>
                <Route path={'/login'} element={ <LoginForm/>}/>
                <Route path="*" element={<Navigate to ="/login" />}/>
            </Routes>
        </div>
    );
};

export default AppRoutes;