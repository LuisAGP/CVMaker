from django.db import models
from users.models import Profile
from .consts import CONTACT_TYPES, LANGUAGE_LEVEL
import uuid
from .utils import resume_template_directory_path


class ResumeTemplate(models.Model):
    template = models.FileField(upload_to=resume_template_directory_path)

    def __str__(self):
        return str(self.template)


class Resume(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    resume_name = models.CharField(max_length=255)
    resume_template = models.ForeignKey(ResumeTemplate, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    lastname = models.CharField(max_length=60, null=True)
    grade = models.CharField(max_length=255)
    introduction = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.resume_name
 


class ResumeContact(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    contact_type = models.CharField(max_length=40, choices=CONTACT_TYPES, default="phone")
    value = models.CharField(max_length=255)
    url = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.contact_type}'



class ResumeWorkExperience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField(null=True)
    current = models.BooleanField(default=False)
    company_name = models.CharField(max_length=255)
    charge = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.company_name}'



class ResumeEducation(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField(null=True)
    current = models.BooleanField(default=False)
    academy_name = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    duration = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.academy_name}'



class ResumeCourseCertification(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    academy_name = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    from_date = models.DateField()
    duration = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.field_of_study}'



class ResumeLanguage(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    language = models.CharField(max_length=255)
    level = models.CharField(max_length=40, choices=LANGUAGE_LEVEL, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.language}'




class ResumeSkill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    skill = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.resume.resume_name} - {self.skill}'

