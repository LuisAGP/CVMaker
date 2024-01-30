from django.contrib import admin
from .models import *

class TemplateAdmin(admin.ModelAdmin):
    pass

class ResumeTemplateAdmin(admin.ModelAdmin):
    pass

class ResumeAdmin(admin.ModelAdmin):
    pass

class ResumeContactAdmin(admin.ModelAdmin):
    pass

class ResumeWorkExperienceAdmin(admin.ModelAdmin):
    pass

class ResumeEducationAdmin(admin.ModelAdmin):
    pass

class ResumeCourseCertificationAdmin(admin.ModelAdmin):
    pass

class ResumeLanguageAdmin(admin.ModelAdmin):
    pass

class ResumeSkillAdmin(admin.ModelAdmin):
    pass

admin.site.register(ResumeTemplate, ResumeTemplateAdmin)
admin.site.register(Resume, ResumeAdmin)
admin.site.register(ResumeContact, ResumeContactAdmin)
admin.site.register(ResumeWorkExperience, ResumeWorkExperienceAdmin)
admin.site.register(ResumeEducation, ResumeEducationAdmin)
admin.site.register(ResumeCourseCertification, ResumeCourseCertificationAdmin)
admin.site.register(ResumeLanguage, ResumeLanguageAdmin)
admin.site.register(ResumeSkill, ResumeSkillAdmin)