import React, {useContext} from 'react';
import {CSSTransition} from 'react-transition-group';
import {AlertContext} from "../context/alert/alertContext";

const Alert = () => {
    const {alert, hide} = useContext(AlertContext)
    return (
        <CSSTransition
        in={true}
        timeout={{
            enter: 500,
            exit: 350,
        }}
        classNames={'alert'}
        mountOnEnter
        unmountOnExit
        >
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible ${alert.visibility}`}>
                <strong>Attention! </strong>
                {alert.text}
                <button onClick={hide} type="button" className="btn-close" aria-label="Close"></button>
            </div>
        </CSSTransition>
    );
};

export default Alert;