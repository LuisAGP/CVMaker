from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Resume, ResumeContact, ResumeWorkExperience, ResumeEducation, ResumeLanguage, ResumeSkill


# @receiver(post_save, sender=Resume)
# def create_resume(sender, instance, created, **kwargs):
#     if created:

        # resume_contact = ResumeContact()
        # resume_contact.resume = instance
        # resume_contact.save()

        # resume_work_experience = ResumeWorkExperience()
        # resume_work_experience.resume = instance
        # resume_work_experience.save()

        # resume_education = ResumeEducation()
        # resume_education.resume = instance
        # resume_education.save()

        # resume_language = ResumeLanguage()
        # resume_language.resume = instance
        # resume_language.save()

        # resume_skill = ResumeSkill()
        # resume_skill.resume = instance
        # resume_skill.save()

