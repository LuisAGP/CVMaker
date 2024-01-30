from django.urls import path
from .views import *

urlpatterns = [
    path('', home_view, name='home'),
    path('resume', resume_list_view, name="resume_list"),
    path('save_resume/<str:idResume>', save_resume, name="save_resume"),
    path('get_resume_info/', get_resume_info, name="get_resume_info"),
    path('create_new_resume', create_new_resume, name="new_resume"),
    path('delete_resume', delete_resume, name="delete_resume"),
    path('save_general_info', save_general_info),
    path('save_contact_info', save_contact_info),
    path('delete_contact_info', delete_contact_info),
    path('save_language_info', save_language_info),
    path('delete_language_info', delete_language_info),
    path('save_skill_info', save_skill_info),
    path('delete_skill_info', delete_skill_info),
    path('save_work_experience_info', save_work_experience_info),
    path('delete_work_experience_info', delete_work_experience_info),
    path('save_education_info', save_education_info),
    path('delete_education_info', delete_education_info),
    path('save_course_info', save_course_info),
    path('delete_course_info', delete_course_info),
    path('print_pdf_resume/<str:id>', print_pdf_resume, name="print_pdf_resume")
]
