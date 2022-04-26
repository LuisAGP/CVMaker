import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import '../../../static/css/alert.css';

const Alert = ({alert, setAlert}) => {

    /**
     * Condition to hide the alert after 2.5 secons
     * @author Luis GP
     */
     if(alert.status == "show"){
        let timer = setInterval(() => {
            setAlert({
                ...alert,
                status: 'hide'
            });
            clearInterval(timer)
        }, 2500);
    }


    return (
        <div className={alert.status === 'show' ? 'message-panel show-message' : 'message-panel hide-message'}>
            <div className="message-box">
                <div className={alert.type + " icon-content"}>
                    <span className={alert.type}></span>
                    { alert.type == 'info' ? <InfoIcon /> : null }
                    { alert.type == 'alert' ? <WarningIcon /> : null }
                    { alert.type == 'error' ? <ReportIcon /> : null }
                </div>
                <div className="message-field">{alert.message}</div>
            </div>
        </div>
    )
}

export default Alert