let idResume;

loadDocument.push((e) => {

    fillMonthSelect();
    fillYearSelect();

    idResume = document.getElementById('idResume').value;

});



const fillMonthSelect = () => {

    try {
       
        let inputMonth = document.getElementsByClassName('inputMonth');

        for(let i of inputMonth){
            i.innerHTML = `
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>`;
        }
        
    } catch (e) {
        console.error(e)
    }

}




const fillYearSelect = () => {

    try {
        
        let inputYear = document.getElementsByClassName('inputYear');
        let year = new Date().getFullYear();

        for(let i of inputYear){
            
            if(i.classList.contains('current')){
                i.innerHTML = '<option value="current">Current</option>';
            }else{
                i.innerHTML = "";
            }

            for(let j = year; j > year-70; j--){
                i.innerHTML += `<option value="${j}">${j}</option>`;
            }
        }

    } catch (e) {
        console.error(e);
    }

}



const saveGeneralInfo = () => {

    try {

        let form = document.getElementById('form-resumeGeneralInfo');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_general_info",
            body: body,
            success: (data) => {
                alertOk(data);
            },
            error: (error) => {
                console.error(error)
            }
        });
        
    } catch (e) {
        console.error(e);
    }

}




const addContact = () => {

    try {
        
        let form = document.getElementById('form-contactInfo');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_contact_info",
            body: body,
            success: (data) => {

                form.reset();

                let contactsContainer = document.getElementById('contacs-container');
                contactsContainer.innerHTML = "";

                for(let i of data.contacts){
                    contactsContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-sm-2 col-4">
                            <input type="text" class="form-control" value="${i.contact_type}" disabled>
                        </div>
                    
                        <div class="form-group col-sm-8 col-6">
                            <input type="tel" class="form-control" value="${i.value}" disabled>
                        </div>

                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteContact('${i.id}')">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}


const deleteContact = (idContact) => {
 
    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_contact', idContact);

        ajax({
            url: "/delete_contact_info",
            body: body,
            success: (data) => {

                let contactsContainer = document.getElementById('contacs-container');
                contactsContainer.innerHTML = "";

                for(let i of data.contacts){
                    contactsContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-sm-2 col-4">
                            <input type="text" class="form-control" value="${i.contact_type}" disabled>
                        </div>
                    
                        <div class="form-group col-sm-8 col-6">
                            <input type="tel" class="form-control" value="${i.value}" disabled>
                        </div>

                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteContact('${i.id}')">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }
    
}






const putUrlInput = (select) => {

    try {

        let input = document.getElementById('contact-input-url');
        
        const needUrl = [
            'linkedin',
            'github',
            'stackoverflow',
            'facebook',
            'instagram',
            'tiktok'
        ]

        if(needUrl.includes(select.value)){

            input.classList.add('shown');
            input.classList.remove('hidden');

        }else{

            input.classList.add('hidden');
            input.classList.remove('shown');
            input.value = "";

        }

    } catch (e) {
        console.error(e);
    }

}






const addLanguage = () => {

    try {
        
        let form = document.getElementById('form-languageInfo');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_language_info",
            body: body,
            success: (data) => {

                form.reset();

                let languageContainer = document.getElementById('languages-container');
                languageContainer.innerHTML = "";

                for(let i of data.languages){
                    languageContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-sm-2 col-4">
                            <input type="text" class="form-control" value="${i.level}" disabled>
                        </div>
                    
                        <div class="form-group col-sm-8 col-6">
                            <input type="tel" class="form-control" value="${i.language}" disabled>
                        </div>

                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteLanguage('${i.id}')">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e)
    }

}




const deleteLanguage = (idLanguage) => {

    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_language', idLanguage);

        ajax({
            url: "/delete_language_info",
            body: body,
            success: (data) => {

                let languageContainer = document.getElementById('languages-container');
                languageContainer.innerHTML = "";

                for(let i of data.languages){
                    languageContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-sm-2 col-4">
                            <input type="text" class="form-control" value="${i.level}" disabled>
                        </div>
                    
                        <div class="form-group col-sm-8 col-6">
                            <input type="tel" class="form-control" value="${i.language}" disabled>
                        </div>

                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteLanguage('${i.id}')">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}





const addSkill = () => {

    try {
        
        let form = document.getElementById('form-skillInfo');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_skill_info",
            body: body,
            success: (data) => {

                form.reset();

                let skillContainer = document.getElementById('skill-container');
                skillContainer.innerHTML = "";

                for(let i of data.skills){
                    skillContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-10">
                            <input type="text" class="form-control" value="${i.skill}" disabled>
                        </div>
        
                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteSkill(${i.id})">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e)
    }

}



const deleteSkill = (idSkill) => {

    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_skill', idSkill);

        ajax({
            url: "/delete_skill_info",
            body: body,
            success: (data) => {

                let skillContainer = document.getElementById('skill-container');
                skillContainer.innerHTML = "";

                for(let i of data.skills){
                    skillContainer.innerHTML += `<div class="row mb-2">
                        <div class="form-group col-10">
                            <input type="text" class="form-control" value="${i.skill}" disabled>
                        </div>
        
                        <div class="col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteSkill(${i.id})">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
                    </div>`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}




const addExperience = () => {

    try {
        
        let form = document.getElementById('form-workExperience');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_work_experience_info",
            body: body,
            success: (data) => {

                form.reset();

                let workContainer = document.getElementById('workExperience-container');
                workContainer.innerHTML = "";

                for(let i of data.experience){
                    workContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-11 col-10">
                            <div class="row">
                                <div class="form-group col-sm-8 mb-2">
                                    <input type="text" class="form-control" disabled value="${ i.company_name }" />
                                </div>
                
                                <div class="form-group col-sm-4 mb-2">
                                    <input type="input" class="form-control" value="${ i.from_date } - ${ i.to_date ? i.to_date : "Current" }" disabled>
                                </div>
                            </div>
        
                            <div class="row mb-2">
                                <div class="form-group col-12">
                                    <input type="text" class="form-control" disabled value="${ i.charge }" />
                                </div>
                            </div>
                
                            <div class="row mb2">
                                <div class="form-group col-12">
                                    <textarea class="form-control" disabled rows="5">${ i.description }</textarea>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-sm-1 col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteExperience(${i.id})">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
        
                    </div>
                    <hr class="hr" />`;

                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e)
    }

}




const deleteExperience = (idWork) => {

    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_work', idWork);

        ajax({
            url: "/delete_work_experience_info",
            body: body,
            success: (data) => {

                let workContainer = document.getElementById('workExperience-container');
                workContainer.innerHTML = "";

                for(let i of data.experience){
                    workContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-11 col-10">
                            <div class="row">
                                <div class="form-group col-sm-8 mb-2">
                                    <input type="text" class="form-control" disabled value="${ i.company_name }" />
                                </div>
                
                                <div class="form-group col-sm-4 mb-2">
                                    <input type="input" class="form-control" value="${ i.from_date } - ${ i.to_date ? i.to_date : "Current" }" disabled>
                                </div>
                            </div>
        
                            <div class="row mb-2">
                                <div class="form-group col-12">
                                    <input type="text" class="form-control" disabled value="${ i.charge }" />
                                </div>
                            </div>
                
                            <div class="row mb2">
                                <div class="form-group col-12">
                                    <textarea class="form-control" disabled rows="5">${ i.description }</textarea>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-sm-1 col-2 text-center">
                            <span class="btn btn-danger" onclick="deleteExperience(${i.id})">
                                <i class="bi bi-trash-fill"></i>
                            </span>
                        </div>
        
                    </div>
                    <hr class="hr" />`;

                }
                
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}






const addEducation = () => {

    try {
        
        let form = document.getElementById('form-education');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_education_info",
            body: body,
            success: (data) => {

                form.reset();

                let educationContainer = document.getElementById('education-container');
                educationContainer.innerHTML = "";

                for(let i of data.education){
                    educationContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-9">
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.academy_name}"/>
                            </div>
        
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.field_of_study}"/>
                            </div>
                        </div>
        
                        <div class="col-sm-3">
        
                            <div class="form-group mb-2">
                                <input type="input" class="form-control" value="${i.from_date} - ${ i.to_date ? i.to_date : "Current" }" disabled>
                            </div>
            
                            <div class="col-2 text-center">
                                <span class="btn btn-danger" onclick="deleteEducation('${i.id}')">
                                    <i class="bi bi-trash-fill"></i>
                                </span>
                            </div>
        
                        </div>
                        
                    </div>
        
                    <hr class="hr" />`;
                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e)
    }

}






const deleteEducation = (idEducation) => {

    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_education', idEducation);

        ajax({
            url: "/delete_education_info",
            body: body,
            success: (data) => {

                let educationContainer = document.getElementById('education-container');
                educationContainer.innerHTML = "";

                for(let i of data.education){
                    educationContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-9">
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.academy_name}"/>
                            </div>
        
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.field_of_study}"/>
                            </div>
                        </div>
        
                        <div class="col-sm-3">
        
                            <div class="form-group mb-2">
                                <input type="input" class="form-control" value="${i.from_date} - ${ i.to_date ? i.to_date : "Current" }" disabled>
                            </div>
            
                            <div class="col-2 text-center">
                                <span class="btn btn-danger" onclick="deleteEducation('${i.id}')">
                                    <i class="bi bi-trash-fill"></i>
                                </span>
                            </div>
        
                        </div>
                        
                    </div>
        
                    <hr class="hr" />`;
                }
                
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}






const addCourse = () => {

    try {
        
        let form = document.getElementById('form-course');
        let body = new FormData(form);
        body.append('id_resume', idResume);

        ajax({
            url: "/save_course_info",
            body: body,
            success: (data) => {

                form.reset();

                let courseContainer = document.getElementById('course-container');
                courseContainer.innerHTML = "";

                for(let i of data.course){
                    courseContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-9">
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.academy_name}"/>
                            </div>
        
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.field_of_study}"/>
                            </div>
                        </div>
        
                        <div class="col-sm-3">
        
                            <div class="row mb-2">
                                <div class="form-group col-6">
                                    <input type="input" class="form-control" value="${i.from_date}" disabled>
                                </div>
            
                                <div class="form-group col-6">
                                    <input type="input" class="form-control" value="${i.duration} h" disabled>
                                </div>
                            </div>

                            <div class="col-2 text-center">
                                <span class="btn btn-danger" onclick="deleteCourse(${i.id})">
                                    <i class="bi bi-trash-fill"></i>
                                </span>
                            </div>
        
                        </div>
                        
                    </div>
        
                    <hr class="hr" />`;

                }
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e)
    }

}





const deleteCourse = (idCourse) => {

    try {
        
        let body = new FormData();
        body.append('id_resume', idResume);
        body.append('id_course', idCourse);

        ajax({
            url: "/delete_course_info",
            body: body,
            success: (data) => {

                let courseContainer = document.getElementById('course-container');
                courseContainer.innerHTML = "";

                for(let i of data.course){
                    courseContainer.innerHTML += `<div class="row mb-2">
                        <div class="col-sm-9">
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.academy_name}"/>
                            </div>
        
                            <div class="form-group mb-2">
                                <input type="text" class="form-control" disabled value="${i.field_of_study}"/>
                            </div>
                        </div>
        
                        <div class="col-sm-3">

                            <div class="row mb-2">
                                <div class="form-group col-6">
                                    <input type="input" class="form-control" value="${i.from_date}" disabled>
                                </div>
            
                                <div class="form-group col-6">
                                    <input type="input" class="form-control" value="${i.duration} h" disabled>
                                </div>
                            </div>
            
                            <div class="col-2 text-center">
                                <span class="btn btn-danger" onclick="deleteCourse(${i.id})">
                                    <i class="bi bi-trash-fill"></i>
                                </span>
                            </div>
        
                        </div>
                        
                    </div>
        
                    <hr class="hr" />`;

                }
                
            },
            error: (error) => {
                alertError(error);
            }
        });

    } catch (e) {
        console.error(e);
    }

}

