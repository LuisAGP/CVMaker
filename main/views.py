from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.forms.models import model_to_dict
from datetime import datetime
from django.template.loader import get_template
from weasyprint import HTML
import json
from .models import *
from .consts import CONTACT_TYPES, LANGUAGE_LEVEL, CONTACT_ICONS
from xhtml2pdf import pisa

def home_view(request):
    return render(request, 'views/home.html', {})


def resume_list_view(request): 
    context = {
        'resume_list': Resume.objects.filter(profile=request.user.profile),
        'templates': ResumeTemplate.objects.all()
    }
    return render(request, 'views/resume_list.html', context=context)

def get_resume_info(request):
    try:
        print("Hola")
        resume = Resume.objects.get(id=request.POST['id_resume'])
        response = {
            'resume_name': resume.resume_name,
            'template': resume.resume_template.id,
            'code': 200
        }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")


# Function to start a new Resume
# @author Luis GP
def create_new_resume(request):

    if request.method != "POST":
        return redirect('resume_list')

    if request.POST['id_resume']:
        resume = Resume.objects.get(id=request.POST['id_resume'])
        resume.resume_name = request.POST['resume_name']
        resume.resume_template = ResumeTemplate.objects.get(id=request.POST['template'])
        resume.save()

        return redirect('resume_list')
    else:
        resume = Resume()
        resume.name = request.user.profile.name
        resume.lastname = request.user.profile.lastname
        resume.grade = request.user.profile.grade
        resume.resume_name = request.POST['resume_name']
        resume.resume_template = ResumeTemplate.objects.get(id=request.POST['template'])
        resume.profile = request.user.profile
        resume.save()

    return redirect('save_resume', idResume=resume.id)



# View to save and update a Resume
# author Luis GP
def save_resume(request,idResume):
    resume = Resume.objects.get(id=idResume)

    if resume.profile != request.user.profile:
        return redirect('resume_list_view')

    context = {
        'resume': resume,
        'contacts': ResumeContact.objects.filter(resume=resume),
        'works': ResumeWorkExperience.objects.filter(resume=resume),
        'educations': ResumeEducation.objects.filter(resume=resume),
        'courses': ResumeCourseCertification.objects.filter(resume=resume),
        'languages': ResumeLanguage.objects.filter(resume=resume),
        'skills': ResumeSkill.objects.filter(resume=resume),
        'contact_types': CONTACT_TYPES,
        'levels': LANGUAGE_LEVEL
    }

    return render(request, 'views/resume_forms/save_resume.html', context)



# Function for save general information
# @author Luis GP
# @return JSON
def save_general_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        resume.name = request.POST['name']
        resume.lastname = request.POST['lastname']
        resume.grade = request.POST['grade']
        resume.introduction = request.POST['introduction']

        resume.save()

        response = { "message": 'General Information was save successfully!', "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")





# Function for save contact information
# @author Luis GP
# @return JSON
def save_contact_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        contact = ResumeContact()
        contact.resume = resume
        contact.contact_type = request.POST['contact_type']
        contact.value = request.POST['value']
        contact.url = request.POST['url']

        contact.save()

        resume_contacts = ResumeContact.objects.filter(resume=resume)
        contacts = []

        for i in resume_contacts:
            i.resume = None
            contacts.append(model_to_dict(i))

        response = { "message": 'New Contact Added successfully!', "contacts": contacts, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")





# Function for delete contact information
# @author Luis GP
# @return JSON
def delete_contact_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        contact = ResumeContact.objects.filter(id=request.POST['id_contact'], resume=resume)
        contact.delete()

        resume_contacts = ResumeContact.objects.filter(resume=resume)
        contacts = []

        for i in resume_contacts:
            i.resume = None
            contacts.append(model_to_dict(i))

        response = { "message": 'A Contact Was Deleted!', "contacts": contacts, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")




# Function for save language information
# @author Luis GP
# @return JSON
def save_language_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        language = ResumeLanguage()
        language.resume = resume
        language.level = request.POST['level']
        language.language = request.POST['language']

        language.save()

        resume_languages = ResumeLanguage.objects.filter(resume=resume)
        languages = []

        for i in resume_languages:
            i.resume = None
            languages.append(model_to_dict(i))

        response = { "message": 'New Language Added successfully!', "languages": languages, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")






# Function for delete language information
# @author Luis GP
# @return JSON
def delete_language_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        language = ResumeLanguage.objects.filter(id=request.POST['id_language'], resume=resume)
        language.delete()

        resume_languages = ResumeLanguage.objects.filter(resume=resume)
        languages = []

        for i in resume_languages:
            i.resume = None
            languages.append(model_to_dict(i))

        response = { "message": 'A Language Was Deleted!', "languages": languages, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")





# Function for save skill
# @author Luis GP
# @return JSON
def save_skill_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        skill = ResumeSkill()
        skill.resume = resume
        skill.skill = request.POST['skill']

        skill.save()

        resume_skill = ResumeSkill.objects.filter(resume=resume)
        skills = []

        for i in resume_skill:
            i.resume = None
            skills.append(model_to_dict(i))

        response = { "message": 'New Skill Added successfully!', "skills": skills, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")




# Function for delete skill
# @author Luis GP
# @return JSON
def delete_skill_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        skill = ResumeSkill.objects.filter(id=request.POST['id_skill'], resume=resume)
        skill.delete()

        resume_skill = ResumeSkill.objects.filter(resume=resume)
        skills = []

        for i in resume_skill:
            i.resume = None
            skills.append(model_to_dict(i))

        response = { "message": 'A Language Was Deleted!', "skills": skills, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response), content_type="application/json")




# Function for save work experience
# @author Luis GP
# @return JSON
def save_work_experience_info(request):
    response = {}
    
    try:

        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        from_date = f'{request.POST["from_year"]}-{request.POST["from_month"]}-01'
        to_date = None
        if request.POST['to_year'] != 'current':
            to_date = f'{request.POST["to_year"]}-{request.POST["to_month"]}-01'

        experience = ResumeWorkExperience()
        experience.resume = resume
        experience.from_date = from_date
        experience.to_date = to_date
        experience.current = True if not to_date else False
        experience.company_name = request.POST['company_name']
        experience.charge = request.POST['charge']
        experience.description = request.POST['description']

        experience.save()

        resume_work_experience = ResumeWorkExperience.objects.filter(resume=resume)
        experience = []

        for i in resume_work_experience:
            i.resume = None
            experience.append(model_to_dict(i))

        response = { "message": 'New Work Experience Added successfully!', "experience": experience, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")





# Function for delete work experience
# @author Luis GP
# @return JSON
def delete_work_experience_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        experience = ResumeWorkExperience.objects.filter(id=request.POST['id_work'], resume=resume)
        experience.delete()

        resume_work_experience = ResumeWorkExperience.objects.filter(resume=resume)
        experience = []

        for i in resume_work_experience:
            i.resume = None
            experience.append(model_to_dict(i))

        response = { "message": 'A Work Experience Was Deleted!', "experience": experience, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")






# Function for save education information
# @author Luis GP
# @return JSON
def save_education_info(request):
    response = {}
    
    try:

        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        from_year = int(request.POST["from_year"])
        from_month = int(request.POST["from_month"])

        to_year = int(request.POST["to_year"])
        to_month = int(request.POST["to_month"])

        from_date = f'{from_year}-{from_month}-01'
        to_date = f'{to_year}-{to_month}-01'

        start_date = datetime(from_year,from_month,1)
        end_date = datetime(to_year,to_month,1)
        difference = end_date - start_date

        duration = "0 years"
        
        if difference.days >= 365:
            duration = f"{round(difference.days/365, 1)} years"
        elif difference.days >= 30:
            duration = f"{int(difference.days/30)} months"
        else:
            duration = f"{int(difference.days)} days"

        education = ResumeEducation()
        education.resume = resume
        education.from_date = from_date
        education.to_date = to_date
        education.academy_name = request.POST['academy_name']
        education.field_of_study = request.POST['field_of_study']
        education.duration = duration

        education.save()

        resume_education = ResumeEducation.objects.filter(resume=resume)
        education = []

        for i in resume_education:
            i.resume = None
            education.append(model_to_dict(i))

        response = { "message": 'New Education Added successfully!', "education": education, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")





# Function for delete education information
# @author Luis GP
# @return JSON
def delete_education_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        education = ResumeEducation.objects.filter(id=request.POST['id_education'], resume=resume)
        education.delete()

        resume_education = ResumeEducation.objects.filter(resume=resume)
        education = []

        for i in resume_education:
            i.resume = None
            education.append(model_to_dict(i))

        response = { "message": 'A Education Was Deleted!', "education": education, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")





# Function for delete skill
# @author Luis GP
# @return JSON
def save_course_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        course = ResumeCourseCertification()
        course.resume = resume
        course.academy_name = request.POST['academy_name']
        course.field_of_study = request.POST['field_of_study']
        course.duration = request.POST['duration']
        course.from_date = f'{request.POST["from_year"]}-01-01'

        course.save()

        resume_course = ResumeCourseCertification.objects.filter(resume=resume)
        course = []

        for i in resume_course:
            i.resume = None
            course.append(model_to_dict(i))

        response = { "message": 'New Course Added successfully!', "course": course, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")





# Function for course information
# @author Luis GP
# @return JSON
def delete_course_info(request):
    response = {}
    
    try:
        
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        course = ResumeCourseCertification.objects.filter(id=request.POST['id_course'], resume=resume)
        course.delete()

        resume_course = ResumeCourseCertification.objects.filter(resume=resume)
        course = []

        for i in resume_course:
            i.resume = None
            course.append(model_to_dict(i))

        response = { "message": 'A Course Was Deleted!', "course": course, "code": 200 }
    except Exception as e:
        response = { "message": str(e), "code": 500 }

    return HttpResponse(json.dumps(response, indent=4, sort_keys=True, default=str), content_type="application/json")





# Function for generate pdf resume
# @author Luis GP
# @return JSON
def print_pdf_resume(request, id):
    try:
        resume = Resume.objects.get(id=id)
        template = get_template(str(resume.resume_template.template))
        context = {
            'resume': resume,
            'contacts': ResumeContact.objects.filter(resume=resume),
            'works': ResumeWorkExperience.objects.filter(resume=resume),
            'educations': ResumeEducation.objects.filter(resume=resume),
            'courses': ResumeCourseCertification.objects.filter(resume=resume),
            'languages': ResumeLanguage.objects.filter(resume=resume),
            'skills': ResumeSkill.objects.filter(resume=resume),
            'icons': CONTACT_ICONS
        }

        html_template = template.render(context, request=request)
        pdf_file = HTML(string=html_template).write_pdf() 

        http_response = HttpResponse(pdf_file, content_type='application/pdf')
        http_response['Content-Disposition'] = f'{str(resume.resume_name)}.pdf'

        return http_response   

    except Exception as e:
        return HttpResponse(e)




# Function for delete all the resume
# @author Luis GP
# @return JSON
def delete_resume(request):
    try:
        resume = Resume.objects.get(id=request.POST['id_resume'])

        if resume.profile != request.user.profile:
            raise Exception("Sorry, something got wrong!")

        resume.delete()
        
        return redirect('resume_list')

    except Exception as e:
        return HttpResponse(e)