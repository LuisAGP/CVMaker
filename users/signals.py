from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Profile

# When a new User is saved then run this function
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)



@receiver(post_delete, sender=Profile)
def delete_profile(sender, instance, *args, **kwargs):
    
    try:
        instance.photo.delete(save=False)
    except:
        pass



@receiver(pre_save, sender=Profile)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    try:
        old_img = instance.__class__.objects.get(id=instance.id).photo.path
        try:
            new_img = instance.photo.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass