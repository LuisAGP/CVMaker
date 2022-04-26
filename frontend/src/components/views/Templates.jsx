import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import '../../../static/css/templates.css';
import Modal from '../widgets/Modal.jsx';
import Alert from '../widgets/Alert.jsx';
import { ajax } from '../tools/helpers.js';
import html2canvas from 'html2canvas';
import { urlBase } from '../tools/helpers.js'

const Templates = () => {

    const [show, setShow] = React.useState(false);
    const [alert, setAlert] = React.useState({
        status: 'hide',
        message: '',
        type: 'info'
    });




    /**
     * Function for get all the template´s data
     * @author Luis GP
     * @return Boolean
     */
    const getTemplates = () => {

        ajax({
            url: '/getTemplates/',
            success: function(data){
                
                try {
                    
                    for(let i of data){

                        let template = document.createElement('div');
                        template.innerHTML = `<img src="${urlBase}/${i.template}" />`;
                        template.className = "item-template"
    
                        document.getElementById('templates-content').append(template);
    
                    }

                } catch (error) {
                    console.log(error);
                }

            },
            error: function(error){
                console.log(error);
            }
        });

    }






    /**
     * Function for upload a new template
     * @author Luis GP
     * @return {Boolean}
     */
    const uploadTemplate = () => {

        let canvas  = document.getElementById('previewHTML').getElementsByTagName('canvas')[0];
        let formData = new FormData(document.getElementById('form-loadTemplate'));
        formData.append('template_image', canvas.toDataURL('image/jpeg', 1.0))
                
        ajax({
            url: '/uploadTemplate/',
            data: formData,
            formData: true,
            success: function(data){
                if(data.status == 200){
                    setAlert({
                        message: data.message,
                        type: 'info',
                        status: 'show'
                    })
                }else{
                    setAlert({
                        message: data.message,
                        type: 'error',
                        status: 'show'
                    })
                }
            },
            error: function(error){
                console.log(error);
            }
        });

        return false;

    }



    const previewHtml = () =>{

        try{

            // Aquí se debe desabilitar el botón

            let file = document.getElementById('input-files').files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {

                let content = document.getElementById("previewHTML");
                content.innerHTML = reader.result;

                html2canvas(document.getElementById("template-div")).then(function(canvas) {
                    content.innerHTML = "";
                    content.appendChild(canvas);
                    // Aquí se debe habilitar el botón
                });

            }, false);
            
            if (file) {
                reader.readAsText(file);
            }

        }catch(e){
            console.error(e);
        }

    }




    React.useEffect( () => {

        getTemplates();

    }, [])




    return (
        <>
            <div id="templates-content" className='templrates-content body'>

                <a className='create-new-template' onClick={() => setShow(true)}>
                    <ArticleOutlinedIcon 
                        className="svg-centered"
                        sx={{ fontSize: 60 }}
                        />
                    <AddCircleOutlinedIcon className="svg-lower"/>
                </a>

            </div>


            <Modal
                title="New Template"
                show={show}
                setShow={setShow}
                // height="14rem"
                width="60rem"
                height='auto'
                buttonOkName="Upload"
                functionButtonOk={uploadTemplate}
                idForm="form-loadTemplate"
                >
                <div className='input-group'>
                    <label htmlFor="template">Load a template</label>
                    <input type="file" name="template" accept=".html" id="input-files" onChange={previewHtml}/>
                </div>
                <div id='previewHTML' className="previewTemplate"></div>
            </Modal>
            <Alert alert={alert} setAlert={setAlert}/>
        </>
    )
}

export default Templates