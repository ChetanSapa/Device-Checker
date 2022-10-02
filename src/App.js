import {BrowserRouter} from 'react-router-dom'
import {Navbar} from "./components/Navbar";
import Alert from "./components/Alert";
import AlertState from "./context/alert/AlertState";
import {DatabaseState} from "./context/dataBase/databaseState";
import React from "react";
import AppRoutes from "./components/AppRoutes";

function App() {
    return (
        <DatabaseState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-4">
                        <Alert/>
                        <AppRoutes/>
                    </div>
                </BrowserRouter>
            </AlertState>
        </DatabaseState>
    );
}

export default App;
