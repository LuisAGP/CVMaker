# Generated by Django 4.1.2 on 2023-01-25 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_rename_resumecoursescertifications_resumecoursecertification'),
    ]

    operations = [
        migrations.AddField(
            model_name='resumeeducation',
            name='duration',
            field=models.CharField(default=0, max_length=50),
            preserve_default=False,
        ),
    ]
