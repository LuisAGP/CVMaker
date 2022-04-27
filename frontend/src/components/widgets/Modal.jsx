import React from 'react'
import '../../../static/css/modal.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Loading from './Loading.jsx';

const Modal = (
    {
        children, 
        title, 
        width='28rem',
        height='30rem',
        idForm="form",
        buttonOkName="Ok",
        functionButtonOk=false,
        functionButtonCancel=false,
        show={modal: false, loading: false},
        setShow
    }) => {

    const hideModal = () => {

        if(functionButtonCancel){
            functionButtonCancel();
        }

        setShow({...show, modal: false});

    }


    const defaultFunction = () => {
        return false;
    }

  return (
    <div className={show.modal ? 'modal-background' : 'modal-background hidden'}>
        <div 
            className={show.modal ? 'modal-content shown' : 'modal-content hide'} 
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
                    <button onClick={ functionButtonOk && !show.loading ? functionButtonOk : defaultFunction} className="modal-button ok-button">
                        { 
                            show.loading ? buttonOkName : <Loading />
                        }
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