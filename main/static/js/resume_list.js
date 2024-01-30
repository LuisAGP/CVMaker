// Ready function
document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById('modalNewResume').addEventListener('show.bs.modal', (e) => {
        e.target.querySelector('form').reset();
        let idResume = e.relatedTarget.dataset.id_resume;
        if(idResume){
            document.getElementById('modalNewResume-id_resume').value = idResume;
            getResumeInfo(idResume);
        }
    });

});

const deleteResume = (idResume) => {
    document.getElementById('modalDeleteResume-id_resume').value = idResume;
}

const getResumeInfo = (idResume) => {
    
    try {

        let body = new FormData();
        body.append('id_resume', idResume);

        ajax({
            url: "/get_resume_info/",
            body: body,
            success: (data) => {

                document.getElementById('modalNewResume-resume_name').value = data.resume_name;
                document.getElementById('modalNewResume-template').value = data.template;
                
            },
            error: (error) => {
                console.error(error)
            }
        });
        
    } catch (e) {
        console.error(e);
    }

} 