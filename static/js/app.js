document.querySelectorAll("a").onclick = function(e) {
    console.log(e, e.relatedTarget)
    return false;
};


const ajax = (json) => {

    fetch(urlBase+json.url, {
        method: json.method ? json.method : "POST",
        headers: {
            'X-CSRFToken': csrfToken
        },
        mode: 'same-origin',
        body: json.body ? json.body : null
    })
    .then(response => response.json())
    .then(data => {
        
        if(data.code == 200){
            json.success(data)
        }else{
            json.error(data)
        }

    })
    .catch(error => {
        console.error(error);
    })

}



const alertOk = (data) => {

    document.getElementById('modal-content').classList.remove('modal-bg-danger');
    document.getElementById('modal-content').classList.add('modal-bg-success');
    document.getElementById('alert-body-message').innerHTML = `<div class="text-center">${data.message}</div>`;

    modalAlert.show();

}



const alertError = (data) => {

    document.getElementById('modal-content').classList.remove('modal-bg-success');
    document.getElementById('modal-content').classList.add('modal-bg-danger');
    document.getElementById('alert-body-message').innerHTML = `<div class="text-center">${data.message}</div>`;

    modalAlert.show();

}