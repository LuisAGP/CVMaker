from django.shortcuts import render
from django.http.response import HttpResponse
from django.core.files.base import File
import json
import datetime
import os
import base64
import uuid

from .models import Template
from django.conf import settings

# Create your views here.

def request_data(request):
    data = None

    if 'data' in request.POST:
        data = json.loads(request.POST.get('data'))

    return data



def index(request):
    return render(request, 'frontend/index.html', {})




def upload_template(request):
    response = {}

    try:

        if 'template' in request.FILES:
                        
            if 'template_image' in request.POST: 
                path = f"{settings.MEDIA_ROOT}\\templates\\templates_images"
                if not os.path.exists(path):
                    os.makedirs(path)
                img_data = str(request.POST['template_image']).replace('data:image/jpeg;base64,', '')
                img_name = f"{uuid.uuid4()}.jpeg"
                img_url  = f"{path}\\{img_name}"
                with open(img_url, "wb") as template_image:
                    template_image.write(base64.b64decode(img_data))
            else:
                raise Exception("Cannot load the template")

            for index, filename in request.FILES.items():
                file = request.FILES[index]
                extension = str(filename).split('.')[-1]

                template                = Template()
                template.filename       = filename
                template.image_name     = img_name
                template.image_url      = img_url
                template.file_extention = extension
                template.url            = f"{settings.MEDIA_ROOT}/templates/{filename}"
                template.file           = file

                template.save()

                response = {'message': 'Template was save correctly!', 'status': 200}

        else:
            response = {'message': 'No file found!', 'status': 500}

    except Exception as e:
        response = {'message': str(e), 'status': 500}


    return HttpResponse(json.dumps(response), content_type="application/json")




def get_templates(request):
    response = {}

    try:
        
        templates = Template.objects.all()
        response = []

        for item in templates.values():
            response.append({
                "template": f"media/templates/templates_images/{item['image_name']}",
                "id_template": item['id_template']
            })

    except Exception as e:
        response = {'message': str(e), 'status': 500}

    return HttpResponse(json.dumps(response), content_type="application/json")




def delete_template(request):
    response = {}

    try:

        data = request.POST

        template = Template.objects.get(pk=data['id_template'])

        template.file.delete(save=False)
        template._delete_image()
        template.delete()

        response = {'message': "Template deleted", 'status': 200}

    except Exception as e:
        response = {'message': str(e), 'status': 500}

    return HttpResponse(json.dumps(response), content_type="application/json")



'''
Function for convert queryset to json
@author Luis GP
@param queryset
@return JSON
'''
def queryset_to_json(queryset):
    json = {}
    for item in queryset.values():
        for key in item.keys():
            if isinstance(item[key], datetime.date):
                time = item[key].strftime('%d/%m/%Y')
                json[key] = time
            else:
                json[key] = item[key]

    return json    