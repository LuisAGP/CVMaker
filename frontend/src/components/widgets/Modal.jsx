import React from 'react'
import '../../../static/css/modal.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const Modal = (
    {
        children, 
        title, 
        width='28rem',
        height='30rem',
        idForm="form",
        buttonOkName="Ok",
        functionButtonOk=false,
        show,
        setShow
    }) => {

    const hideModal = () => {
        setShow(false);
    }


    const defaultFunction = () => {
        return false;
    }

  return (
    <div className={show ? 'modal-background' : 'modal-background hidden'}>
        <div 
            className={show ? 'modal-content shown' : 'modal-content hide'} 
            style={{
                width: width,
                height: height
            }}
            >
            <div className='modal-header'>
                <span className="modal-title">{title}</span>
                <CancelRoundedIcon 
                    className='modal-cancel-button'
                    onClick={hideModal}
                />
            </div>

            <div className='modal-body'>
                <form action="" id={idForm}>
                    {children}
                </form>
            </div>

            <div className='modal-footer'>
                {
                    <button onClick={ functionButtonOk ? functionButtonOk : defaultFunction} className="modal-button ok-button">
                        {buttonOkName}
                    </button>
                }

                <button onClick={hideModal} className="modal-button">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
  )
}

export default Modal