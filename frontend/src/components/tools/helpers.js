
export const urlBase = window.location.origin; 

export function ajax(json){

    try{

        let data = null;

        if(json.formData){
            data = json.data
        }else if(json.data && typeof json.data == 'object'){
            data = new FormData();
            Object.keys(json.data).forEach((key) => {
                data.append(key, json.data[key]);
            });
        }else if(json.data){
            data = json.data;
        }

        fetch(urlBase+json.url, {
            method: json.type ? json.type : 'POST',
            credentials: 'include',
            headers: {
                "X-CSRFToken": getCsrf(),
                ...json.headers
            },
            body: data
        })
        .then(result => result.json())
        .then(data => {
            json.success(data);
        })
        .catch(error => {
            json.error(error);
        });

    }catch(e){
        console.error(e);
    }

}




function getCsrf(){

    let csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    return csrf;

}