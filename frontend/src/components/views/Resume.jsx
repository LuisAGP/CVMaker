import React from 'react';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import '../../../static/css/templates.css';
import Modal from '../widgets/Modal.jsx';
import Alert from '../widgets/Alert.jsx';
import { ajax } from '../tools/helpers.js';
import html2canvas from 'html2canvas';
import { urlBase } from '../tools/helpers.js';

const Resume = () => {

    const [modalChooseTemplate, setModalChooseTemplate] = React.useState({modal: false, loading: false});

    return (
        <>
          <div id="templates-content" className='templrates-content body'>

            <a className='create-new-template' onClick={() => setModalChooseTemplate({...modalChooseTemplate, modal: true})}>
                <ArticleOutlinedIcon 
                    className="svg-centered"
                    sx={{ fontSize: 60 }}
                    />
                <AddCircleOutlinedIcon className="svg-lower"/>
            </a>

          </div>

          <Modal
                title="Choose a template"
                show={modalChooseTemplate}
                setShow={setModalChooseTemplate}
                width="60rem"
                height='auto'
                buttonOkName="Upload"
                // functionButtonOk={uploadTemplate}
                // functionButtonCancel={closeModalNewTemplate}
                idForm="form-loadTemplate"
                >
                <div className='input-group'>
                    <label htmlFor="template">Load a template</label>
                    <input type="file" name="template" accept=".html" id="input-files"/>
                </div>
                <div id='previewHTML' className="previewTemplate"></div>
            </Modal>
        </>
    )
}

export default Resume