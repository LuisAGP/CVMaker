# Generated by Django 4.1.2 on 2023-01-11 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_resumecontact_contact_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='resume_name',
            field=models.CharField(default='Example', max_length=255),
            preserve_default=False,
        ),
    ]