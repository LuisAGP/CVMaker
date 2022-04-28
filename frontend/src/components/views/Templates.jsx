import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import '../../../static/css/templates.css';
import Modal from '../widgets/Modal.jsx';
import Alert from '../widgets/Alert.jsx';
import { ajax } from '../tools/helpers.js';
import html2canvas from 'html2canvas';
import { urlBase } from '../tools/helpers.js';

const Templates = () => {

    const [modalNewTemplate, setModalNewTemplate] = React.useState({modal: false, loading: false});
    const [modalDeleteTemplate, setModalDeleteTemplate] = React.useState({modal: false, loading: false});
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
                    
                    removeItemsTemplates();

                    for(let i of data){

                        let template = document.createElement('div');
                        template.innerHTML = `<img src="${urlBase}/${i.template}" />`;
                        template.className = "item-template";

                        template.onmouseover = function(){

                            if(this.querySelector('.delete-template-button')){ return; }

                            let deleteButton       = document.createElement('a');
                            deleteButton.className = "delete-template-button";
                            deleteButton.innerText = "Delete";

                            deleteButton.onclick = function(){ deleteTemplate(i.id_template); }
                            this.append(deleteButton);

                        }

                        template.onmouseout = function(){
                            
                            let e = event.toElement || event.relatedTarget;
                            if (e.parentNode == this || e == this) { return; }

                            this.querySelector('.delete-template-button').remove();

                        }
    
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
     * Function to clean templates items from screen
     * @author Luis GP
     * @returns {Boolean}
     */
    const removeItemsTemplates = () => {

        let items = document.querySelectorAll('.item-template');
        for(let item of items){
            item.remove();
        }

        return false;

    }







    /**
     * Function for delete a template
     * @author Luis GP
     * @param {Integer} idTemplate
     */
    const deleteTemplate = (idTemplate, deleteNow=false) => {

        if(!deleteNow){

            document.getElementById('form-deleteTemplate-id_template').value = idTemplate;
            setModalDeleteTemplate({...modalNewTemplate, modal: true});

            return;
        }
        
        ajax({
            url: '/deleteTemplate/',
            data: {
                id_template: idTemplate ? idTemplate : document.getElementById('form-deleteTemplate-id_template').value
            },
            success: function(data){

                setModalDeleteTemplate({loading: true, ...modalDeleteTemplate});
                
                try {
                   
                    if(data.status == 200){
                        setAlert({
                            message: data.message,
                            type: 'info',
                            status: 'show'
                        });
                        getTemplates();
                        setModalDeleteTemplate({loading: false, modal: false});
                    }else{
                        setAlert({
                            message: data.message,
                            type: 'error',
                            status: 'show'
                        });
                        setModalDeleteTemplate({loading: false, ...modalDeleteTemplate});
                    }
                    
                } catch (error) {
                    console.error(error);
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
        formData.append('template_image', canvas.toDataURL('image/jpeg', 1.0));

        setModalNewTemplate({...modalNewTemplate, loading: true});
                
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
                    });
                    getTemplates();
                    setModalNewTemplate({...modalNewTemplate, modal: false});
                }else{
                    setAlert({
                        message: data.message,
                        type: 'error',
                        status: 'show'
                    });
                    setModalNewTemplate({...modalNewTemplate, loading: false});
                }
            },
            error: function(error){
                console.log(error);
            }
        });

        return false;

    }





    /**
     * Function to load a preview image of the template
     * @author Luis GP
     * @return {Boolean}
     */
    const previewHtml = () =>{

        try{

            setModalNewTemplate({...modalNewTemplate, loading: true});

            let file = document.getElementById('input-files').files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {

                let content = document.getElementById("previewHTML");
                content.innerHTML = reader.result;
                content.style = `margin-top: 2rem; padding: 2rem; background-color: rgba(107, 107, 107, 0.699);`;

                html2canvas(content.querySelector('div')).then(function(canvas) {
                    content.innerHTML = "";
                    content.appendChild(canvas);
                    setModalNewTemplate({...modalNewTemplate, loading: false});
                });

            }, false);
            
            if (file) {
                reader.readAsText(file);
            }

        }catch(e){
            console.error(e);
        }

    }



    /**
     * Function to clean the preview section in modal
     * @author Luis GP
     * @return {Boolean}
     */
    const closeModalNewTemplate = () => {

        try {
           
            let content = document.getElementById("previewHTML");
            content.innerHTML = "";
            content.style = ``;
            
        } catch (error) {
            console.error(e);
        }

        return false;

    }




    React.useEffect( () => {

        getTemplates();

    }, [])




    return (
        <>
            <div id="templates-content" className='templrates-content body'>

                <a className='create-new-template' onClick={() => setModalNewTemplate({...modalNewTemplate, modal: true})}>
                    <ArticleOutlinedIcon 
                        className="svg-centered"
                        sx={{ fontSize: 60 }}
                        />
                    <AddCircleOutlinedIcon className="svg-lower"/>
                </a>

            </div>


            <Modal
                title="New Template"
                show={modalNewTemplate}
                setShow={setModalNewTemplate}
                width="60rem"
                height='auto'
                buttonOkName="Upload"
                functionButtonOk={uploadTemplate}
                functionButtonCancel={closeModalNewTemplate}
                idForm="form-loadTemplate"
                >
                <div className='input-group'>
                    <label htmlFor="template">Load a template</label>
                    <input type="file" name="template" accept=".html" id="input-files" onChange={previewHtml}/>
                </div>
                <div id='previewHTML' className="previewTemplate"></div>
            </Modal>

            <Modal
                title="Delete template"
                show={modalDeleteTemplate}
                setShow={setModalDeleteTemplate}
                width="20rem"
                height='auto'
                buttonOkName="Delete"
                functionButtonOk={() => deleteTemplate(null, true)}
                idForm="form-deleteTemplate"
                >
                <div className='input-group'>
                    <h4 className='center'>Are you sure to delete the template?</h4>
                    <input type="hidden" name='id_template' id="form-deleteTemplate-id_template"/>
                </div>
            </Modal>

            <Alert alert={alert} setAlert={setAlert}/>
        </>
    )
}

export default Templates